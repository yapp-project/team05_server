CREATE TABLE `test`.`meetinfo` (
  `fk_meetId` INT UNSIGNED NOT NULL,
  `flag` INT UNSIGNED NOT NULL,
  `date` DATETIME NOT NULL,
  `isEnded` INT NOT NULL,
  `meetinfoId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`meetinfoId`),
  UNIQUE INDEX `meetinfoId_UNIQUE` (`meetinfoId` ASC) VISIBLE,
  INDEX `fk_meetId_idx` (`fk_meetId` ASC) VISIBLE,
  CONSTRAINT `fk_meetIdidx`
    FOREIGN KEY (`fk_meetId`)
    REFERENCES `test`.`meetendtable` (`meet_Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
   ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;