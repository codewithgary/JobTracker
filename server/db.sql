USE JobTracker;
CREATE TABLE IF NOT EXISTS `User` (
  `id` int(11) NOT NULL
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `firstname` varchar(100),
  `lastname` varchar(100),
  `city` varchar(100),
  `state` varchar(10),
  `country` varchar(10),
  `role` varchar(100),
  `company` varchar(100),
  `schoolinfo` varchar(100)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
ALTER TABLE `User` ADD PRIMARY KEY (`id`);
ALTER TABLE `User` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `Skill` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
ALTER TABLE `Skill` ADD PRIMARY KEY (`id`);
ALTER TABLE `Skill` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;


CREATE TABLE IF NOT EXISTS `UserSkill` (
  `userid` int(11) NOT NULL,
  `skillid` int(11) NOT NULL,
  `level` int(10) NOT NULL,
  foreign key (userid) references User(id)
);


CREATE TABLE IF NOT EXISTS `Job` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `company` varchar(255) NOT NULL,
  `city` varchar(100),
  `state` varchar(20),
  `country` varchar(20),
  `description` varchar(256),
  `status` varchar(100),
  `skill1` varchar(50),
  `skill2` varchar(50),
  `skill3` varchar(50),
  `skill4` varchar(50),
  `skill5` varchar(50),
  `email` varchar(50)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
ALTER TABLE `Job` ADD PRIMARY KEY (id);
ALTER TABLE `Job` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;



CREATE TABLE IF NOT EXISTS `UserContact` (
  `userid` int(11) NOT NULL,
  `contactid` int(11) NOT NULL,
  foreign key (userid) references User(id),
  foreign key (contactid) references User(id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `JobContact` (
  `jobid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  foreign key (jobid) references Job(id),
  foreign key (userid) references User(id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `JobSkill` (
  `jobid` int(11) NOT NULL,
  `skillid` int(11) NOT NULL,
  `level` int(10),
  foreign key (jobid) references Job(id),
  foreign key (skillid) references Skill(id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `JobApplicant` (
  `jobid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  foreign key (jobid) references Job(id),
  foreign key (userid) references User(id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


-- Create table for contacts

CREATE TABLE Contacts (
  `contactID` int(11) NOT NUll UNIQUE AUTO_INCREMENT,
  `userEmail` varchar(100) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `info` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phoneNumber` varchar(15) NOT NULL,
  PRIMARY KEY (`contactID`)
) ENGINE=InnoDB;



