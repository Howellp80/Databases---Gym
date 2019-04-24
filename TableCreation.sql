-- Parker Howell
-- CS 340
-- Wolford 
-- Winter 2017


-- Clear old tables
DROP TABLE IF EXISTS `rout_exer`;
DROP TABLE IF EXISTS `memb_exer`;
DROP TABLE IF EXISTS `routine`;
DROP TABLE IF EXISTS `member`;
DROP TABLE IF EXISTS `membership`;
DROP TABLE IF EXISTS `exercise`;

-- Build New Tables...
-- Membership Table
CREATE TABLE `membership` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`type` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Exercise Table
CREATE TABLE `exercise` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`sets` int(11),
	`reps` int(11),
	PRIMARY KEY (`id`)
	) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Member Table
CREATE TABLE `member` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`f_name` varchar(255) NOT NULL,
	`l_name` varchar(255) NOT NULL,
	`msid` int(11),
	PRIMARY KEY (`id`),
	FOREIGN KEY (`msid`) REFERENCES `membership` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
	UNIQUE KEY (`f_name`, `l_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Routine Table
CREATE TABLE `routine` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`mid` int(11),
	PRIMARY KEY (`id`),
	UNIQUE KEY (`name`),
	FOREIGN KEY (`mid`) REFERENCES `member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Memb_Exer Table
CREATE TABLE `memb_exer` (
	`mid` int(11),
	`eid` int(11),
	PRIMARY KEY (`mid`, `eid`),
	FOREIGN KEY (`mid`) REFERENCES `member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (`eid`) REFERENCES `exercise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Rout_Exer Table
CREATE TABLE `rout_exer` (
	`rid` int(11),
	`eid` int(11),
	PRIMARY KEY (`rid`, `eid`),
	FOREIGN KEY (`rid`) REFERENCES `routine` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (`eid`) REFERENCES `exercise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



-- Insert Data...
-- Into Membership
INSERT INTO `membership` VALUES (NULL, 'Day Use'),
										  (NULL, '1 Month'),
										  (NULL, '3 Month'),
										  (NULL, '1 Year');


-- Into Member
INSERT INTO `member` VALUES (NULL, 'Vivian', 'Warde', 1),
									 (NULL, 'Jacob', 'Gray', 2),
									 (NULL, 'Ava', 'Petersen', 4),
									 (NULL, 'Alex', 'Brooks', 2),
									 (NULL, 'Leroy', 'Jenkins', 3),
									 (NULL, 'William', 'Page', 1);


-- Into Exercise
INSERT INTO `exercise` VALUES (NULL, 'Bench Press', 3, 10),
										(NULL, 'Squats', 3, 12),
										(NULL, 'Incline Dumbbell Press', 2, 15),
										(NULL, 'Pullups', 4, 8),
										(NULL, 'Bent Over Rows', 4, 10),
										(NULL, 'Skull Crushers', 3, 15),
										(NULL, 'Preacher Curls', 3, 15),
										(NULL, 'Crunches', 5, 20),
										(NULL, 'Hammer Curls', 4, 10),
										(NULL, 'Cable Tricep Extension', 4, 10);


-- Into Routine
INSERT INTO `routine` VALUES (NULL, 'My Upper Workout', 3),
										(NULL, 'My Lower Workout', 3),
										(NULL, 'Push 1', 2),
										(NULL, 'Feel the Burn', 4),
										(NULL, 'Resolution', 4),
										(NULL, 'Leroys Workout', 5);


-- Into Memb_Exer
INSERT INTO `memb_exer` VALUES (1, 4),
										 (1, 1),
										 (1, 6),
										 (6, 9),
										 (6, 10);


-- Into Rout_Exer
INSERT INTO `rout_exer` VALUES (1, 1),
										 (1, 3),
										 (1, 4),
										 (1, 5),
										 (1, 6),
										 (2, 2),
										 (2, 8),
										 (3, 1),
										 (3, 6),
										 (3, 10),
										 (4, 2),
										 (4, 3),
										 (4, 7),
										 (5, 6),
										 (5, 8),
										 (5, 10),
										 (6, 1),
										 (6, 2);

