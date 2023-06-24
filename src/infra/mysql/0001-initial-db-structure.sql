CREATE TABLE IF NOT EXISTS `tab_restaurant` (
  `restaurant_id` INT(11) NOT NULL AUTO_INCREMENT,
  `restaurant_uuid` VARCHAR(40) NOT NULL,
  `name` VARCHAR(200) NOT NULL DEFAULT '',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP,
  PRIMARY KEY (`restaurant_id`)
);

CREATE TABLE IF NOT EXISTS `tab_address` (
  `restaurant_id` INT(11) NOT NULL,
  `street` VARCHAR(200) NOT NULL,
  `number` INT(11) NOT NULL,
  `zip_code` VARCHAR(16) NOT NULL,
  `city` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`restaurant_id`),
  CONSTRAINT `fk_tab_restaurant_tab_address` FOREIGN KEY (`restaurant_id`) REFERENCES `tab_restaurant` (`restaurant_id`)
);

-- TODO: remodel structure
CREATE TABLE IF NOT EXISTS `tab_opening_hours` (
  `restaurant_id` INT(11) NOT NULL,
  `weekday` INT(11) NOT NULL,
  `start_hour` TIME NOT NULL,
  `end_hour` TIME NOT NULL,
  PRIMARY KEY (`restaurant_id`),
  CONSTRAINT `fk_tab_restaurant_tab_address` FOREIGN KEY (`restaurant_id`) REFERENCES `tab_restaurant` (`restaurant_id`)
);

-- TODO: remodel structure
CREATE TABLE IF NOT EXISTS `tab_weekday` (
  `weekday_id` INT(11) NOT NULL,
  `weekday_name` VARCHAR(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
)
