CREATE TABLE `meetinterests` (
  `meetIntId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `sports` int(11) DEFAULT '0',
  `activity` int(11) DEFAULT '0',
  `writing` int(11) DEFAULT '0',
  `study` int(11) DEFAULT '0',
  `exhibition` int(11) DEFAULT '0',
  `music` int(11) DEFAULT '0',
  `movie` int(11) DEFAULT '0',
  `diy` int(11) DEFAULT '0',
  `volunteer` int(11) DEFAULT '0',
  `picture` int(11) DEFAULT '0',
  `game` int(11) DEFAULT '0',
  `cooking` int(11) DEFAULT '0',
  `coffee` int(11) DEFAULT '0',
  `nail` int(11) DEFAULT '0',
  `car` int(11) DEFAULT '0',
  `interior` int(11) DEFAULT '0',
  `concert` int(11) DEFAULT '0',
  `etc` int(11) DEFAULT '0',
  `fk_meetId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`meetIntId`),
  UNIQUE KEY `intId_UNIQUE` (`meetIntId`),
  KEY `fk_meetId_idx` (`fk_meetId`),
  CONSTRAINT `meet_id` FOREIGN KEY (`fk_meetId`) REFERENCES `meettable` (`meet_Id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
