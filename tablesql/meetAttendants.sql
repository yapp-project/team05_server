--모임참여자, 모임 참여 인원 수에 쓰임
CREATE TABLE IF NOT EXISTS `test`.`meetAttendants` (
  `fk_meet_Id` INT(20) UNSIGNED NOT NULL,
  `fk_attendants_Id` VARCHAR(20) NOT NULL,
  `meetAttendants_Id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`meetAttendants_Id`, `fk_meet_Id`, `fk_attendants_Id`),
  UNIQUE INDEX `meetAttendants_Id_UNIQUE` (`meetAttendants_Id` ASC) VISIBLE,
    CONSTRAINT `fk_meet_Id`
    FOREIGN KEY (`fk_meet_Id`)
    REFERENCES `test`.`meettable` (`meet_Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_attendants_Id`
    FOREIGN KEY (`fk_attendants_Id`)
    REFERENCES `test`.`jointable` (`userId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


