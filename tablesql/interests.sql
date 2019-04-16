CREATE TABLE `test`.`interests` (
  `intId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `sports` TINYINT NOT NULL DEFAULT 0,
  `activity` TINYINT NOT NULL DEFAULT 0,
  `write` TINYINT NOT NULL DEFAULT 0,
  `study` TINYINT NOT NULL DEFAULT 0,
  `festival` TINYINT NOT NULL DEFAULT 0,
  `music` TINYINT NOT NULL DEFAULT 0,
  `diy` TINYINT NOT NULL DEFAULT 0,
  `volunteer` TINYINT NOT NULL DEFAULT 0,
  `picture` TINYINT NOT NULL DEFAULT 0,
  `game` TINYINT NOT NULL DEFAULT 0,
  `cooking` TINYINT NOT NULL DEFAULT 0,
  `fk_userId` VARCHAR(20),
  `fk_meetId` INT UNSIGNED,
  PRIMARY KEY (`intId`),
  UNIQUE INDEX `fk_userId_idx` (`fk_userId` ASC) VISIBLE,
  UNIQUE INDEX `fk_meetId_idx` (`fk_meetId` ASC) VISIBLE,
  CONSTRAINT `fk_meetId`
    FOREIGN KEY (`fk_meetId`)
    REFERENCES `test`.`meettable` (`meet_Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_userId`
    FOREIGN KEY (`fk_userId`)
    REFERENCES `test`.`users` (`userId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;