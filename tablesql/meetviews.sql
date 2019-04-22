CREATE TABLE `meetviews` (
  `fk_meetId` int(10) unsigned NOT NULL,
  `views` int(11) DEFAULT NULL,
  PRIMARY KEY (`fk_meetId`),
  UNIQUE KEY `fk_meetId_UNIQUE` (`fk_meetId`),
  CONSTRAINT `fk_meetId3` FOREIGN KEY (`fk_meetId`) REFERENCES `meettable` (`meet_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
