CREATE TABLE `simmo`.`cancelreasons` (
  `fk_meetId` INT UNSIGNED NOT NULL,
  `cancelReason` VARCHAR(100) NULL,
  PRIMARY KEY (`fk_meetId`),
  UNIQUE INDEX `fk_meetId_UNIQUE` (`fk_meetId` ASC) VISIBLE,
  CONSTRAINT `fkmeet_id`
    FOREIGN KEY (`fk_meetId`)
    REFERENCES `simmo`.`meetendtable` (`meet_Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
