/**************************************** */
/*** IP:		62.108.32.***:3306
/*** USER:		jrlwd_root	
/*** PASSWORT:	dhbw2020#
/**************************************** */

/**************************************** */
/*** USER
/**************************************** */
GRANT SELECT
ON log
TO server;

/**************************************** */
/*** TABLES
/**************************************** */
/* USER */
INSERT INTO user(firstname, lastname, birthday,plz,city,password,mail) VALUES('Max','Mustermann','2002-06-03','88400','Biberach an der Ri�','<<hash>>', 'max@mustermann.de');
DROP TABLE user;
CREATE TABLE IF NOT EXISTS user (		/* USER-TABLE like mentioned in SM05 */
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),
  firstname varchar(31) default NULL,
  lastname varchar(63) default NULL,
  birthday DATE default '2000-01-01',
  plz varchar(5) default NULL,
  city varchar(127) default NULL,
  password varchar(128) default NULL,
  mail varchar(127) default NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

/* SESSION */
DROP TABLE session;
CREATE TABLE IF NOT EXISTS session (		/* USER-TABLE like mentioned in SM05 */
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),
  user_id int(11) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
  start_ts varchar(31) default NULL,
  end_ts varchar(31) default NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

/* LOCATION */
INSERT INTO location(name, latitude, longitude) VALUES('Buchenwald',19.311143,1.582031);
CREATE TABLE IF NOT EXISTS location (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),
  name varchar(100) default NULL,
  info varchar(200) default NULL,
  latitude DECIMAL(10,7) default NULL,
  longitude DECIMAL(10,7) default NULL,
  country VARCHAR(100) default 'Deutschland',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

/* BUCKET */
INSERT INTO bucket(name) VALUES('Eimer 23');
CREATE TABLE IF NOT EXISTS bucket (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),
  location_id int(11) DEFAULT NULL,
  FOREIGN KEY (location_id) REFERENCES location(id),
  name varchar(100) default NULL, 
  info varchar(200) default NULL,
  toads_count int(11) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

/* BUCKET-EMPTY PROCESS */
INSERT INTO empty_bucket(bucket_id, user_id) VALUES(1,16);
DROP TABLE empty_bucket;
CREATE TABLE IF NOT EXISTS empty_bucket (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),
  bucket_id int(11) DEFAULT NULL,
  FOREIGN KEY (bucket_id) REFERENCES bucket(id),
  user_id int(11) DEFAULT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

/* FENCH */
INSERT INTO fench(name) VALUES('Zaun 23');
CREATE TABLE IF NOT EXISTS fench (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),
  location_id int(11) DEFAULT NULL,
  FOREIGN KEY (location_id) REFERENCES location(id),
  name varchar(100) default NULL,  
  info varchar(200) default NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

CREATE TABLE IF NOT EXISTS log (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),
  log varchar(100) default NULL,
  ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

/**************************************** */
/*** VIEWS
/**************************************** */
CREATE OR REPLACE VIEW sys_user AS
	SELECT firstname, lastname,mail, 'online' AS status
	FROM user u
	JOIN session s
	ON s.user_id = u.id
	GROUP BY u.id;
SELECT * FROM sys_user;

CREATE OR REPLACE VIEW sys_sessioning AS
	SELECT firstname, lastname,mail, start_ts, end_ts
	FROM session s
	JOIN user u
	ON s.user_id = u.id;

CREATE OR REPLACE VIEW ui_log AS
	SELECT * FROM log;
#CREATE INDEX;
/**************************************** */
/*** TEST
/**************************************** */
DROP TABLE location;

INSERT INTO log(log) VALUES('test');
SELECT * FROM bucket;

UPDATE bucket SET name='123' WHERE id = 4;


CREATE OR REPLACE VIEW ui_log AS
SELECT * FROM log;