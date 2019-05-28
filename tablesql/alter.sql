alter table interests drop foreign key `fk_userId2`;
alter table interests add constraint `fk_userId2` FOREIGN KEY (`fk_userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

alter table meettable drop foreign key `userId`;
alter table meettable add CONSTRAINT `userId` FOREIGN KEY (`fk_meetcaptain`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

alter table meetattendants drop foreign key `fk_attendants_Id`;
alter table meetattendants add CONSTRAINT `fk_attendants_Id` FOREIGN KEY (`fk_attendants_Id`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

alter table userImg drop foreign key `fkuserId` ;
alter table userImg add CONSTRAINT `fkuserId` FOREIGN KEY (`fk_userId`) REFERENCES `users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table meetendtable drop foreign key `userIdid` ;
alter table meetendtable add CONSTRAINT `userIdid` FOREIGN KEY (`fk_meetcaptain`) REFERENCES `users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table endmeetAttendants drop foreign key `fkattendantsId`;
alter table endmeetAttendants add CONSTRAINT `fkattendantsId` FOREIGN KEY (`fk_attendants_Id`) REFERENCES `users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table noticecomment drop foreign key `fk_userId123` ;
alter table noticecomment add CONSTRAINT `fk_userId123` FOREIGN KEY (`fk_userId`) REFERENCES `users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
