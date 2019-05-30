CREATE TABLE `interests` (
  `intId` int(11) NOT NULL AUTO_INCREMENT,
  `fk_userId` varchar(20) DEFAULT NULL,
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
  PRIMARY KEY (`intId`),
  KEY `fk_userId_idx` (`fk_userId`),
  CONSTRAINT `fk_userId2` FOREIGN KEY (`fk_userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
