--모임 만들기에서 키워드 부분
CREATE TABLE `test`.`meetkeywords` (
  `fk_meet_Id` INT UNSIGNED NOT NULL,
  `meet_keyword` VARCHAR(500) NOT NULL,
  `meetkeyword_Id` INT UNSIGNED AUTO_INCREMENT NOT NULL,
  PRIMARY KEY (`fk_meet_Id`,`meetkeyword_Id`),
  UNIQUE INDEX `fk_meet_Id_UNIQUE` (`fk_meet_Id` ASC) VISIBLE,
  UNIQUE INDEX `meetkeyword_Id_UNIQUE` (`meetkeyword_Id` ASC) VISIBLE,
  CONSTRAINT `fk_meet_Id`
    FOREIGN KEY (`fk_meet_Id`)
    REFERENCES `test`.`meettable` (`meet_Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;