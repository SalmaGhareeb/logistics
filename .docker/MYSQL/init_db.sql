CREATE DATABASE IF NOT EXISTS wimo;
USE wimo;


CREATE TABLE IF NOT EXISTS shipments (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  pickup_location VARCHAR(100),
  delivery_location VARCHAR(100),
  delivery_date DATE,
  started_at DATETIME,
  finished_at DATETIME,
  `description` VARCHAR(255),
  shipment_status ENUM('pending','started', 'completed'),
  driver_comment VARCHAR(255)
);

SHOW COLUMNS FROM shipments;


GRANT ALL PRIVILEGES on shipments.*
TO 'root'@'%' IDENTIFIED BY 'password'
WITH GRANT OPTION;