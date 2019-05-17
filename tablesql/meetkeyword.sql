CREATE TABLE `meetkeywords` (
  `fk_meet_Id` int(10) unsigned NOT NULL,
  `meet_keyword` varchar(500) NOT NULL,
  `meetkeyword_Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`fk_meet_Id`,`meetkeyword_Id`),
  UNIQUE KEY `fk_meet_Id_UNIQUE` (`fk_meet_Id`),
  UNIQUE KEY `meetkeyword_Id_UNIQUE` (`meetkeyword_Id`),
  CONSTRAINT `fk_meet_Id` FOREIGN KEY (`fk_meet_Id`) REFERENCES `meettable` (`meet_Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
