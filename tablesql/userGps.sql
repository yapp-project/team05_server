CREATE TABLE `usergps` (
  `fk_userId` varchar(20) NOT NULL,
  `gps_lat` double DEFAULT NULL,
  `gps_lan` double DEFAULT NULL,
  PRIMARY KEY (`fk_userId`),
  CONSTRAINT `fk_userId` FOREIGN KEY (`fk_userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
