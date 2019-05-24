CREATE TABLE IF NOT EXISTS `test`.`endmeetAttendants` (
  `fk_meet_Id` INT UNSIGNED NOT NULL,
  `fk_attendants_Id` VARCHAR(20) NOT NULL,
  `meetAttendants_Id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`meetAttendants_Id`),
  UNIQUE INDEX `meetAttendants_Id_UNIQUE` (`meetAttendants_Id` ASC) VISIBLE,
    CONSTRAINT `fkendmeetididid`
    FOREIGN KEY (`fk_meet_Id`)
    REFERENCES `test`.`meetendtable` (`meet_Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fkattendantsId`
    FOREIGN KEY (`fk_attendants_Id`)
    REFERENCES `test`.`users` (`userId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
