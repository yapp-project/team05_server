CREATE TABLE `simmo`.`keywordnums` (
  `keywordnumsId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `fk_meet_Id` int(10) unsigned NOT NULL,
  `keyword` VARCHAR(100) NOT NULL,
  `keywordCount` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`keywordnumsId`),
  UNIQUE INDEX `keyword_UNIQUE` (`keyword` ASC) VISIBLE,
  UNIQUE INDEX `keywordnumsId_UNIQUE` (`keywordnumsId` ASC) VISIBLE,
  CONSTRAINT `fkmeetid` FOREIGN KEY (`fk_meet_Id`) REFERENCES `meettable` (`meet_Id`) ON DELETE CASCADE
  )
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
