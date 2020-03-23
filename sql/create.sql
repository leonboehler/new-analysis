/**********************************************************************
* Project           : DeHaBewe: Smarte Kroetenzaune
*
* Program name      : create.sql
*
* Author            : Dominik Deseyve
*
* Purpose           : Create all tables
* 
/**********************************************************************/
CREATE DATABASE IF NOT EXISTS dehabewe;
USE dehabewe;

DROP TABLE IF EXISTS rt_bucket;
DROP TABLE IF EXISTS log_empty_bucket;
DROP TABLE IF EXISTS st_station;
DROP TABLE IF EXISTS st_bucket;
DROP TABLE IF EXISTS st_readiness;
DROP TABLE IF EXISTS st_assignment;
DROP TABLE IF EXISTS st_location;
DROP TABLE IF EXISTS log_session;
DROP TABLE IF EXISTS st_user;

/**************************************** */
/*** USER
/**************************************** */
CREATE TABLE IF NOT EXISTS st_user (		/* USER-TABLE like mentioned in SM05 */
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),  
  firstname varchar(31) default NULL,
  lastname varchar(63) default NULL,
  birthday DATE default '2000-01-01',
  plz varchar(5) default NULL,
  city varchar(127) default NULL,
  role ENUM('USER', 'ADMIN') DEFAULT 'USER',
  password varchar(128) default NULL,
  mail varchar(127) default NULL,
  UNIQUE KEY(mail),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

/**************************************** */
/*** SESSION
/**************************************** */
CREATE TABLE IF NOT EXISTS log_session (		/* USER-TABLE like mentioned in SM05 */
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),
  user_id int(11) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES st_user(id) ON DELETE CASCADE ON UPDATE CASCADE,
  session_id varchar(128) default NULL,
  start_ts TIMESTAMP NULL default NULL,
  end_ts TIMESTAMP NULL default NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;


/**************************************** */
/*** LOCATION
/**************************************** */
CREATE TABLE IF NOT EXISTS st_location (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),
  name varchar(100) default NULL,
  info varchar(200) default NULL, 
  plz varchar(5) default NULL,
  city varchar(127) default NULL,
  country VARCHAR(100) default 'Deutschland',
  latitude DECIMAL(10,7) default NULL,
  longitude DECIMAL(10,7) default NULL,
  start_latitude DECIMAL(10,7) default NULL,
  start_longitude DECIMAL(10,7) default NULL,
  end_latitude DECIMAL(10,7) default NULL,
  end_longitude DECIMAL(10,7) default NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

/**************************************** */
/*** READINESS
/**************************************** */
CREATE TABLE IF NOT EXISTS st_readiness (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),
  user_id int(11) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES st_user(id) ON DELETE CASCADE ON UPDATE CASCADE, 
  location_id int(11) DEFAULT NULL,
  FOREIGN KEY (location_id) REFERENCES st_location(id) ON DELETE CASCADE ON UPDATE CASCADE, 
  start_ts TIMESTAMP NULL default NULL,
  end_ts TIMESTAMP NULL default NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

/**************************************** */
/*** ASSIGNMENT
/**************************************** */
CREATE TABLE IF NOT EXISTS st_assignment (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),
  user_id int(11) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES st_user(id) ON DELETE CASCADE ON UPDATE CASCADE,
  location_id int(11) DEFAULT NULL,
  FOREIGN KEY (location_id) REFERENCES st_location(id) ON DELETE CASCADE ON UPDATE CASCADE, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;
/**************************************** */
/*** BUCKET
/**************************************** */
CREATE TABLE IF NOT EXISTS st_bucket (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),
  location_id int(11) NOT NULL,
  FOREIGN KEY (location_id) REFERENCES st_location(id) ON DELETE CASCADE ON UPDATE CASCADE,
  name varchar(100) default NULL, 
  mac varchar(100) default NULL, 
  UNIQUE KEY(mac), 
  max_toads int(11) default NULL,
  toads_count int(11) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

/**************************************** */
/*** STADION
/**************************************** */
CREATE TABLE IF NOT EXISTS st_station (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),
  location_id int(11) NOT NULL,
  FOREIGN KEY (location_id) REFERENCES st_location(id) ON DELETE CASCADE ON UPDATE CASCADE,
  mac varchar(100) default NULL, 
  latitude DECIMAL(10,7) default NULL,
  longitude DECIMAL(10,7) default NULL,
  UNIQUE KEY(mac), 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

/**************************************** */
/*** LOG
/**************************************** */
CREATE TABLE IF NOT EXISTS log (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),
  log varchar(100) default NULL,
  session_id varchar(100) default NULL,
  user varchar(100) default NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

/**************************************** */
/*** RUNTIME-TABLE: SENSOR
/**************************************** */
CREATE TABLE IF NOT EXISTS rt_bucket (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),  
  mac varchar(17) NOT NULL,
  toads_count int(11) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

/**************************************** */
/*** LOG-EMPTY-BUCKET
/**************************************** */
CREATE TABLE IF NOT EXISTS log_empty_bucket (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),
  user_id int(11) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES st_user(id) ON DELETE CASCADE ON UPDATE CASCADE,
  bucket_id int(11) NOT NULL,
  FOREIGN KEY (bucket_id) REFERENCES st_bucket(id) ON DELETE CASCADE ON UPDATE CASCADE,
  toads_count int(11) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

/**************************************** */
/*** VIEWS
/**************************************** */

/**************************************** */
/*** UI-VIEW: USER
/**************************************** */
CREATE OR REPLACE VIEW ui_user AS
	SELECT u.id AS 'user_id', firstname, lastname, birthday, mail, plz, city, role AS 'role',
		MAX(
			CASE WHEN start_ts IS NULL AND end_ts IS NULL
					THEN 'false'
				 WHEN end_ts IS NULL
					THEN 'online'
	        	 ELSE 'offline'
	    	END
	    ) AS status,
	   MAX(
			CASE WHEN start_ts IS NULL AND end_ts IS NULL
					THEN 'not logged in yet'				 
				 WHEN end_ts IS NULL
					THEN start_ts
	        	ELSE end_ts
	    	END
	    ) AS last_activity
	FROM st_user u
	LEFT JOIN log_session s
	ON s.user_id = u.id
	GROUP BY u.id;

SELECT * FROM ui_user;

/**************************************** */
/*** UI-VIEW: LOCATION
/**************************************** */
CREATE OR REPLACE VIEW ui_location AS
	SELECT l.id, l.name AS 'location_name', l.city,l.country, SUM(b.toads_count) AS 'toads_count', COUNT(*) AS 'bucket_count'
	FROM st_location l
	JOIN st_bucket b
	ON b.location_id = l.id
	GROUP BY l.id;

SELECT * FROM ui_location;

/**************************************** */
/*** UI-VIEW: STATION
/**************************************** */
CREATE OR REPLACE VIEW ui_station AS
	SELECT s.mac AS 'station_mac', s.latitude AS 'station_latitude', s.longitude AS 'station_longitude', l.name AS 'location_name', b.mac AS 'bucket_mac', ul.bucket_count AS 'buckets_in_location_count'
	FROM st_station s
	LEFT JOIN st_location l
	ON s.location_id = l.id
	LEFT JOIN st_bucket b
	ON b.location_id = l.id
	JOIN ui_location ul
	ON ul.id = l.id;	

SELECT * FROM ui_station;

/**************************************** */
/*** UI-VIEW: BUCKET
/**************************************** */
CREATE OR REPLACE VIEW ui_bucket AS
	SELECT l.name AS 'location_name', l.city, b.name AS 'bucket_name', b.toads_count
	FROM st_bucket b
	JOIN st_location l
	ON b.location_id = l.id;

SELECT * FROM ui_bucket;

/**************************************** */
/*** SYS-VIEW: SENSOR
/**************************************** */
CREATE OR REPLACE VIEW sys_bucket AS
	SELECT b.mac AS 'bucket_mac', b.id AS 'bucket_id',b.name AS 'bucket_name'
	FROM st_bucket b;
	

SELECT * FROM sys_bucket;

/**************************************** */
/*** UI-VIEW: READINESS
/**************************************** */
CREATE OR REPLACE VIEW ui_readiness AS
	SELECT u.id AS 'user_id', u.firstname, u.lastname, r.start_ts, r.end_ts, IF(ISNULL(l.id), 'false', l.name) AS 'is_assigned'
	FROM st_readiness r	
	JOIN st_user u
	ON r.user_id = u.id
	LEFT JOIN st_location l
	ON r.location_id = l.id;

SELECT * FROM ui_readiness;

/**************************************** */
/*** UI-VIEW: STATISTICS
/**************************************** */
CREATE OR REPLACE VIEW ui_statistics AS
	SELECT user_id, u.firstname, u.lastname, b.id AS 'bucket_id', b.name AS 'bucket_name', e.toads_count, e.created_at
	FROM log_empty_bucket e
	JOIN st_bucket b
	ON e.bucket_id = b.id
	JOIN st_user u
	ON e.user_id = u.id;

SELECT * FROM ui_statistics;

/**************************************** */
/*** UI-VIEW: LOG
/**************************************** */
CREATE OR REPLACE VIEW ui_log AS
	SELECT * FROM log;

/**************************************** */
/*** USER: SERVER
/**************************************** */
DROP USER IF EXISTS server;
CREATE USER 'server'@'%' IDENTIFIED BY "dhbw2020#";
GRANT EXECUTE ON dehabewe.* TO server WITH max_user_connections 5;
GRANT SELECT ON dehabewe.ui_bucket TO server;
GRANT SELECT ON dehabewe.ui_user TO server;
GRANT SELECT ON dehabewe.ui_location TO server;
GRANT SELECT ON dehabewe.ui_readiness TO server;
flush PRIVILEGES;

/*select * from mysql.user;*/