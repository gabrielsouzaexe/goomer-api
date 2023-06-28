CREATE TABLE IF NOT EXISTS `tab_restaurant` (
  `restaurant_id` INT(11) NOT NULL AUTO_INCREMENT,
  `restaurant_uuid` VARCHAR(40) NOT NULL,
  `name` VARCHAR(200) NOT NULL DEFAULT '',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP,
  PRIMARY KEY (`restaurant_id`),
  UNIQUE KEY `restaurant_uuid_UNIQUE` (`restaurant_uuid`)
);

CREATE TABLE IF NOT EXISTS `tab_address` (
  `restaurant_id` INT(11) NOT NULL,
  `street` VARCHAR(200) NOT NULL,
  `number` INT(11) NOT NULL,
  `zip_code` VARCHAR(16) NOT NULL,
  `city` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`restaurant_id`),
  CONSTRAINT `fk_tab_address_tab_restaurant` FOREIGN KEY (`restaurant_id`) REFERENCES `tab_restaurant` (`restaurant_id`) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS `tab_weekday` (
  `weekday_id` INT(11) NOT NULL,
  `weekday_name` VARCHAR(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`weekday_id`)
) CHARACTER SET utf8 COLLATE utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `tab_opening_hours` (
  `opening_hour_id` INT(11) NOT NULL AUTO_INCREMENT,
  `restaurant_id` INT(11) NOT NULL,
  `weekday_id` INT(11) NOT NULL,
  `start_hour` TIME NOT NULL,
  `end_hour` TIME NOT NULL,
  PRIMARY KEY (`opening_hour_id`),
  KEY (`restaurant_id`),
  CONSTRAINT `fk_tab_opening_hours_tab_restaurant` FOREIGN KEY (`restaurant_id`) REFERENCES `tab_restaurant` (`restaurant_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_tab_opening_hours_tab_weekday` FOREIGN KEY (`weekday_id`) REFERENCES `tab_weekday` (`weekday_id`)
);

INSERT INTO
  `tab_weekday` (`weekday_id`, `weekday_name`)
VALUES
  ('1', 'Domingo'),
  ('2', 'Segunda'),
  ('3', 'Terça'),
  ('4', 'Quarta'),
  ('5', 'Quinta'),
  ('6', 'Sexta'),
  ('7', 'Sábado');
