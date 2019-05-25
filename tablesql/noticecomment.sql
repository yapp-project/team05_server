CREATE TABLE `noticecomment` (
  `commentId` int(11) NOT NULL AUTO_INCREMENT,
  `fk_meetId` int(10) unsigned DEFAULT NULL,
  `fk_userId` varchar(20) DEFAULT NULL,
  `comment` varchar(1000) DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`commentId`),
  KEY `fk_meetId123_idx` (`fk_meetId`),
  KEY `fk_userId123_idx` (`fk_userId`),
  CONSTRAINT `fk_meetId123` FOREIGN KEY (`fk_meetId`) REFERENCES `meettable` (`meet_Id`),
  CONSTRAINT `fk_userId123` FOREIGN KEY (`fk_userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
