--모임참여자, 모임 참여 인원 수에 쓰임
CREATE TABLE IF NOT EXISTS `test`.`meetAttendants` (
  `fk_meet_name` VARCHAR(45) NOT NULL,
  `fk_attendants_Id` VARCHAR(20) NOT NULL,
  `meetAttendants_Id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`meetAttendants_Id`, `fk_meet_name`, `fk_attendants_Id`),
  UNIQUE INDEX `meetAttendants_Id_UNIQUE` (`meetAttendants_Id` ASC) VISIBLE,
    CONSTRAINT `fk_meet_name`
    FOREIGN KEY (`fk_meet_name`)
    REFERENCES `test`.`meettable` (`meet_name`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_attendants_Id`
    FOREIGN KEY (`fk_attendants_Id`)
    REFERENCES `test`.`jointable` (`userId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


select t.meet_name, t.meet_datetime, t.meet_location,
t.meet_personNumMax from meettable AS t where t.meet_scheduledEnd = 0 AND t.meet_name IN
(select fk_meet_name from meetAttendants where fk_attendants_Id = 'dnjsgml')ORDER BY t.meet_datetime ;