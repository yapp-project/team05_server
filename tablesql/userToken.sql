CREATE TABLE `test`.`usertoken` (
  `fk_userId` VARCHAR(20) NOT NULL,
  `client_token` TEXT NULL,
  `userToken_Id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`userToken_Id`, `fk_userId`),
  UNIQUE INDEX `userToken_Id_UNIQUE` (`userToken_Id` ASC) VISIBLE,
  UNIQUE INDEX `fk_userId_UNIQUE` (`fk_userId` ASC) VISIBLE,
  CONSTRAINT `fk_user_id`
    FOREIGN KEY (`fk_userId`)
    REFERENCES `test`.`users` (`userId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
   ENGINE = InnoDB 
DEFAULT CHARACTER SET = utf8;


select a.fk_attendants_Id AS attendant, c.client_token AS clientToken
from meetAttendants AS a
JOIN usertoken AS c
ON c.fk_userId = a.fk_attendants_Id
where a.fk_meet_Id = 1;