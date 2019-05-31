CREATE TABLE IF NOT EXISTS `simmo`.`meetAttendants` (
  `fk_meet_Id` INT UNSIGNED NOT NULL,
  `fk_attendants_Id` VARCHAR(20) NOT NULL,
  `meetAttendants_Id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`meetAttendants_Id`),
  UNIQUE INDEX `meetAttendants_Id_UNIQUE` (`meetAttendants_Id` ASC) VISIBLE,
    CONSTRAINT `fkmeetidid`
    FOREIGN KEY (`fk_meet_Id`)
    REFERENCES `simmo`.`meettable` (`meet_Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_attendants_Id`
    FOREIGN KEY (`fk_attendants_Id`)
    REFERENCES `simmo`.`users` (`userId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
