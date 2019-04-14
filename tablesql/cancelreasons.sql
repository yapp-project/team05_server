CREATE TABLE `test`.`cancelreasons` (
  `fk_meetId` INT UNSIGNED NOT NULL,
  `cancelReason` VARCHAR(100) NULL,
  PRIMARY KEY (`fk_meetId`),
  UNIQUE INDEX `fk_meetId_UNIQUE` (`fk_meetId` ASC) VISIBLE,
  CONSTRAINT `fkmeet_id`
    FOREIGN KEY (`fk_meetId`)
    REFERENCES `test`.`meettable` (`meet_Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
