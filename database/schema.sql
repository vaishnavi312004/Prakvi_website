CREATE DATABASE IF NOT EXISTS prakvi_website
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

USE prakvi_website;

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(160) NOT NULL,
  work_email VARCHAR(254) NOT NULL,
  company_name VARCHAR(200) NOT NULL,
  phone VARCHAR(40) NULL,
  message TEXT NOT NULL,
  privacy_consent BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_contact_inquiries_created_at (created_at),
  INDEX idx_contact_inquiries_work_email (work_email)
) ENGINE=InnoDB;
