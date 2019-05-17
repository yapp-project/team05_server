CREATE TABLE `meetimgs` (
  `fkmeetId` int(10) unsigned NOT NULL,
  `meetImg` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`fkmeetId`),
  CONSTRAINT `fkmeetididid` FOREIGN KEY (`fkmeetId`) REFERENCES `meettable` (`meet_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;