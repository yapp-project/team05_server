CREATE TABLE `notice` (
  `fk_meetId` int(10) unsigned NOT NULL,
  `contents` varchar(1000) DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`fk_meetId`),
  CONSTRAINT `fk_meetId0` FOREIGN KEY (`fk_meetId`) REFERENCES `meettable` (`meet_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
