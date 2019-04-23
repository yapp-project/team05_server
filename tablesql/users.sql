CREATE TABLE `users` (
  `userId` varchar(20) NOT NULL,
  `userPw` varchar(20) NOT NULL,
  `userBirth` date DEFAULT NULL,
  `userGen` tinyint(4) DEFAULT NULL,
  `userNick` varchar(20) NOT NULL,
  `userImg` mediumblob,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userId_UNIQUE` (`userId`),
  UNIQUE KEY `userNick_UNIQUE` (`userNick`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
