CREATE TABLE `test`.`keywordnums` (
  `keywordnumsId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `keyword` VARCHAR(100) NOT NULL,
  `keywordCount` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`keywordnumsId`),
  UNIQUE INDEX `keyword_UNIQUE` (`keyword` ASC) VISIBLE,
  UNIQUE INDEX `keywordnumsId_UNIQUE` (`keywordnumsId` ASC) VISIBLE)
  
  ENGINE=InnoDB;
