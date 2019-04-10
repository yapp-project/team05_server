--모임 만들기에서 키워드 부분
CREATE TABLE `test`.`meetkeyword` (
  `fk_meet_Id` INT UNSIGNED NOT NULL,
  `meet_keyword` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`fk_meet_Id`),
  UNIQUE INDEX `fk_meet_Id_UNIQUE` (`fk_meet_Id` ASC) VISIBLE,
  CONSTRAINT `fk_meetId`
    FOREIGN KEY (`fk_meet_Id`)
    REFERENCES `test`.`meettable` (`meet_Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);