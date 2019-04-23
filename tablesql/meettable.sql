CREATE TABLE `meett` (
  `fk_meetcaptain` varchar(20) DEFAULT NULL,
  `meet_Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `meet_name` varchar(50) NOT NULL,
  `meet_datetime` datetime NOT NULL,
  `meet_location` varchar(100) NOT NULL,
  `meet_latitude` double NOT NULL,
  `meet_longitude` double NOT NULL,
  `meet_explanation` text NOT NULL,
  `meet_personNumMax` int(6) unsigned NOT NULL,
  `meet_personnumMin` int(6) unsigned NOT NULL,
  `meet_filterSameGender` tinyint(1) DEFAULT NULL,
  `meet_filterSameAgeGroup` tinyint(1) DEFAULT NULL,
  `meet_scheduledEnd` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`meet_Id`),
  UNIQUE KEY `meet_Id_UNIQUE` (`meet_Id`),
  KEY `userId` (`fk_meetcaptain`),
  CONSTRAINT `userId` FOREIGN KEY (`fk_meetcaptain`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
