CREATE TABLE `endmeetimgs` (
  `fkmeetId` int(10) unsigned NOT NULL,
  `meetImg` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`fkmeetId`),
  CONSTRAINT `fkendmeetidid` FOREIGN KEY (`fkmeetId`) REFERENCES `meetendtable` (`meet_Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;