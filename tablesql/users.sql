CREATE TABLE `test`.`users` (
  `userId` VARCHAR(20) NOT NULL,
  `usePw` VARCHAR(20) NOT NULL,
  `userBirth` DATE NULL,
  `userGen` TINYINT NULL,
  `userNick` VARCHAR(20) NOT NULL,
  `userImg` MEDIUMBLOB NULL,
  PRIMARY KEY (`userId`),
  UNIQUE INDEX `userId_UNIQUE` (`userId` ASC) VISIBLE,
  UNIQUE INDEX `userNick_UNIQUE` (`userNick` ASC) VISIBLE);
