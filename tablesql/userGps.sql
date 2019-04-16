CREATE TABLE `test`.`usergps` (
  `fk_userId` VARCHAR(20) NOT NULL,
  `gps_lat` DOUBLE NULL,
  `gps_lan` DOUBLE NULL,
  PRIMARY KEY (`fk_userId`),
  CONSTRAINT `fk_userId`
    FOREIGN KEY (`fk_userId`)
    REFERENCES `test`.`users` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
