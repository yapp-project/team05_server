CREATE TABLE `userimg` (
  `fk_userId` varchar(20) NOT NULL,
  `userImg` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`fk_userId`),
  CONSTRAINT `fkuserId` FOREIGN KEY (`fk_userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
