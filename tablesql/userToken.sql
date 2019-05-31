CREATE TABLE `simmo`.`usertokens` (
  `fk_userId` varchar(20),
  `usertokenId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `usertoken` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`usertokenId`),
  UNIQUE INDEX `fk_userId_UNIQUE` (`fk_userId` ASC) VISIBLE,
  UNIQUE INDEX `usertokenId_UNIQUE` (`usertokenId` ASC) VISIBLE,
    FOREIGN KEY (`fk_userId`)
    REFERENCES `users` (`userId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
