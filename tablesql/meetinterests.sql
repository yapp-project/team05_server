CREATE TABLE `meetInterests` (
  `meetIntId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `sports` tinyint(1) DEFAULT '0',
  `activity` tinyint(1) DEFAULT '0',
  `writing` tinyint(1) DEFAULT '0',
  `study` tinyint(1) DEFAULT '0',
  `exhibition` tinyint(1) DEFAULT '0',
  `music` tinyint(1) DEFAULT '0',
  `movie` tinyint(1) DEFAULT '0',
  `diy` tinyint(1) DEFAULT '0',
  `volunteer` tinyint(1) DEFAULT '0',
  `picture` tinyint(1) DEFAULT '0',
  `game` tinyint(1) DEFAULT '0',
  `cooking` tinyint(1) DEFAULT '0',
  `coffee` tinyint(1) DEFAULT '0',
  `nail` tinyint(1) DEFAULT '0',
  `car` tinyint(1) DEFAULT '0',
  `interior` tinyint(1) DEFAULT '0',
  `concert` tinyint(1) DEFAULT '0',
  `etc` tinyint(1) DEFAULT '0',
  `fk_meetId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`meetIntId`),
  UNIQUE KEY `intId_UNIQUE` (`meetIntId`),
  KEY `fk_meetId_idx` (`fk_meetId`),
  CONSTRAINT `meet_id` FOREIGN KEY (`fk_meetId`) REFERENCES `meettable` (`meet_Id`) 
  ON DELETE CASCADE 
  ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
