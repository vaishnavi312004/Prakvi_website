<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
require_once dirname(__DIR__, 2) . '/config.php';

function respond(int $status, array $body): never
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['error' => 'Only POST requests are accepted.']);
}

$rawBody = file_get_contents('php://input');
if ($rawBody === false || strlen($rawBody) > 20000) {
    respond(413, ['error' => 'The request is too large.']);
}

$input = json_decode($rawBody, true);
if (!is_array($input)) {
    respond(400, ['error' => 'Please submit a valid JSON request.']);
}

$fields = ['fullName', 'workEmail', 'companyName', 'phone', 'message'];
$data = [];
foreach ($fields as $field) {
    $value = $input[$field] ?? '';
    if (!is_string($value)) {
        respond(422, ['error' => 'Please check the submitted form fields.']);
    }
    $data[$field] = trim($value);
}

$required = [
    'fullName' => 160,
    'workEmail' => 254,
    'companyName' => 200,
    'message' => 5000,
];
foreach ($required as $field => $maxLength) {
    if ($data[$field] === '' || strlen($data[$field]) > $maxLength) {
        respond(422, ['error' => 'Please provide all required fields within the allowed length.']);
    }
}
if (!filter_var($data['workEmail'], FILTER_VALIDATE_EMAIL)) {
    respond(422, ['error' => 'Please provide a valid email address.']);
}
if (strlen($data['phone']) > 40 || !is_bool($input['privacyConsent'] ?? null) || !$input['privacyConsent']) {
    respond(422, ['error' => 'Please confirm privacy consent and check your phone number.']);
}

$captchaToken = $input['captchaToken'] ?? '';
$turnstileSecret = appEnv('TURNSTILE_SECRET_KEY');
if (!is_string($captchaToken) || $captchaToken === '' || $turnstileSecret === '') {
    respond(422, ['error' => 'Please complete the security check before submitting.']);
}
$captchaContext = stream_context_create(['http' => [
    'method' => 'POST',
    'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
    'content' => http_build_query(['secret' => $turnstileSecret, 'response' => $captchaToken, 'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '']),
    'timeout' => 5,
]]);
$captchaResponse = @file_get_contents('https://challenges.cloudflare.com/turnstile/v0/siteverify', false, $captchaContext);
$captchaResult = $captchaResponse !== false ? json_decode($captchaResponse, true) : null;
if (!is_array($captchaResult) || empty($captchaResult['success'])) {
    respond(422, ['error' => 'The security check could not be verified. Please try again.']);
}

$databaseSaved = false;
$password = getenv('DB_PASSWORD');
if ($password !== false && $password !== '') {
    $host = getenv('DB_HOST') ?: '127.0.0.1';
    $port = getenv('DB_PORT') ?: '3306';
    $database = getenv('DB_NAME') ?: 'prakvi_website';
    $username = getenv('DB_USER') ?: 'prakvi_app';
    try {
        $pdo = new PDO(
            "mysql:host={$host};port={$port};dbname={$database};charset=utf8mb4",
            $username,
            $password,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ],
        );
        $statement = $pdo->prepare(
            'INSERT INTO contact_inquiries '
            . '(full_name, work_email, company_name, phone, message, privacy_consent) '
            . 'VALUES (:full_name, :work_email, :company_name, :phone, :message, 1)'
        );
        $statement->execute([
            'full_name' => $data['fullName'],
            'work_email' => $data['workEmail'],
            'company_name' => $data['companyName'],
            'phone' => $data['phone'] !== '' ? $data['phone'] : null,
            'message' => $data['message'],
        ]);
        $databaseSaved = true;
    } catch (Throwable $error) {
        error_log('Contact inquiry could not be saved: ' . $error->getMessage());
    }
}

$emailSent = false;
try {
    require_once dirname(__DIR__, 2) . '/mail.php';
    sendContactNotification($data);
    $emailSent = true;
} catch (Throwable $mailError) {
    error_log('Contact inquiry email could not be sent: ' . $mailError->getMessage());
}

if (!$databaseSaved && !$emailSent) {
    respond(503, ['error' => 'We could not deliver your inquiry right now. Please try again later.']);
}
respond(201, ['message' => 'Your inquiry has been received.']);
