--모임 상세 정보, 마이페이지 모임 히스토리 
CREATE TABLE IF NOT EXISTS `test`.`meettable` (
  `fk_meetcaptain` VARCHAR(20),
  `meet_Id` INT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `meet_name` VARCHAR(45) NOT NULL,
  `meet_datetime` DATETIME NOT NULL,
  `meet_location` VARCHAR(45) NOT NULL,
  `meet_latitude` DOUBLE NOT NULL,
  `meet_longitude` DOUBLE NOT NULL,
  `meet_explanation` LONGTEXT NOT NULL,
  `meet_personNumMax` INT(6) UNSIGNED NOT NULL,
  `meet_personnumMin` INT(6) UNSIGNED NOT NULL,
  `meet_filterSameGender` TINYINT(1) NULL DEFAULT NULL,
  `meet_filterSameAgeGroup` TINYINT(1) NULL DEFAULT NULL,
  `meet_scheduledEnd` TINYINT(1) NULL DEFAULT false,
  PRIMARY KEY (`meet_Id`, `fk_meetcaptain`,`meet_name`),
  UNIQUE INDEX `meet_Id_UNIQUE` (`meet_Id` ASC) VISIBLE,
  UNIQUE INDEX `meet_name_UNIQUE` (`meet_name` ASC) VISIBLE,
  CONSTRAINT `userId`
    FOREIGN KEY (`fk_meetcaptain`)
    REFERENCES `test`.`jointable` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;