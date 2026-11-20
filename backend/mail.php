<?php
declare(strict_types=1);

/** Send a contact inquiry over authenticated SMTP with STARTTLS. */
function sendContactNotification(array $data): void
{
    $host = appEnv('SMTP_HOST');
    $port = (int) appEnv('SMTP_PORT', '587');
    $username = appEnv('SMTP_USER');
    $password = appEnv('SMTP_PASSWORD');
    $from = appEnv('CONTACT_EMAIL_FROM');
    $to = appEnv('CONTACT_EMAIL_TO');
    if (!$host || !$port || !$username || !$password || !$from || !$to) {
        throw new RuntimeException('SMTP settings are incomplete.');
    }

    $socket = stream_socket_client("tcp://{$host}:{$port}", $errno, $errstr, 10, STREAM_CLIENT_CONNECT);
    if ($socket === false) {
        throw new RuntimeException("SMTP connection failed: {$errstr}");
    }
    stream_set_timeout($socket, 10);
    try {
        smtpExpect($socket, [220]);
        smtpCommand($socket, 'EHLO prakvi.com', [250]);
        smtpCommand($socket, 'STARTTLS', [220]);
        if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            throw new RuntimeException('Could not establish SMTP TLS.');
        }
        smtpCommand($socket, 'EHLO prakvi.com', [250]);
        smtpCommand($socket, 'AUTH LOGIN', [334]);
        smtpCommand($socket, base64_encode($username), [334]);
        smtpCommand($socket, base64_encode($password), [235]);
        smtpCommand($socket, 'MAIL FROM:<' . smtpAddress($username) . '>', [250]);
        smtpCommand($socket, 'RCPT TO:<' . smtpAddress($to) . '>', [250, 251]);
        smtpCommand($socket, 'DATA', [354]);

        $subject = '=?UTF-8?B?' . base64_encode('New website inquiry from ' . $data['fullName']) . '?=';
        $body = "New inquiry submitted through prakvi.com\r\n\r\n"
            . "Name: {$data['fullName']}\r\nEmail: {$data['workEmail']}\r\nCompany: {$data['companyName']}\r\n"
            . "Phone: {$data['phone']}\r\n\r\nMessage:\r\n{$data['message']}\r\n";
        $message = 'From: ' . $from . "\r\nTo: <" . smtpAddress($to) . ">\r\nReply-To: <" . smtpAddress($data['workEmail']) . ">\r\n"
            . "Subject: {$subject}\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n"
            . preg_replace('/(?m)^\./', '..', str_replace(["\r\n", "\r"], "\n", $body));
        fwrite($socket, str_replace("\n", "\r\n", $message) . "\r\n.\r\n");
        smtpExpect($socket, [250]);
        smtpCommand($socket, 'QUIT', [221]);
    } finally {
        fclose($socket);
    }
}

function smtpAddress(string $address): string
{
    if (!filter_var($address, FILTER_VALIDATE_EMAIL)) {
        throw new RuntimeException('Invalid SMTP email address.');
    }
    return $address;
}

function smtpCommand($socket, string $command, array $expected): string
{
    fwrite($socket, $command . "\r\n");
    return smtpExpect($socket, $expected);
}

function smtpExpect($socket, array $expected): string
{
    $response = '';
    do {
        $line = fgets($socket, 515);
        if ($line === false) {
            throw new RuntimeException('SMTP server closed the connection.');
        }
        $response .= $line;
    } while (isset($line[3]) && $line[3] === '-');
    $code = (int) substr($response, 0, 3);
    if (!in_array($code, $expected, true)) {
        throw new RuntimeException('SMTP server rejected a command (' . $code . ').');
    }
    return $response;
}
