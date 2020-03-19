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

select * from mysql.user;

CREATE DATABASE IF NOT EXISTS dehabewe;
USE dehabewe;
GRANT SELECT ON *.* TO 'server'@'%' IDENTIFIED BY "dhbw2020#" WITH max_user_connections 5;

DROP TABLE IF EXISTS rt_sensor;
DROP TABLE IF EXISTS log_empty_bucket;
DROP TABLE IF EXISTS st_sensor;
DROP TABLE IF EXISTS st_bucket;
DROP TABLE IF EXISTS st_readiness;
DROP TABLE IF EXISTS st_location;
DROP TABLE IF EXISTS log_session;
DROP TABLE IF EXISTS st_user;

SET AUTOCOMMIT = 0;
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
  start_ts DATETIME default NULL,
  end_ts DATETIME default NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;


/**************************************** */
/*** LOCATION
/**************************************** */
CREATE TABLE IF NOT EXISTS st_location (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),
  name varchar(100) default NULL,
  info varchar(200) default NULL,
  latitude DECIMAL(10,7) default NULL,
  longitude DECIMAL(10,7) default NULL,
  plz varchar(5) default NULL,
  city varchar(127) default NULL,
  country VARCHAR(100) default 'Deutschland',
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
  location_id int(11) NOT NULL,
  FOREIGN KEY (location_id) REFERENCES st_location(id) ON DELETE CASCADE ON UPDATE CASCADE,
  start_ts DATETIME default NULL,
  end_ts DATETIME default NULL,
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
  info varchar(200) default NULL,
  toads_count int(11) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

/**************************************** */
/*** SENSOR
/**************************************** */
CREATE TABLE IF NOT EXISTS st_sensor (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),
  bucket_id int(11) NOT NULL,
  FOREIGN KEY (bucket_id) REFERENCES st_bucket(id) ON DELETE CASCADE ON UPDATE CASCADE,
  mac varchar(100) default NULL, 
  UNIQUE KEY(mac),
  info varchar(200) default NULL, 
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
/*** RT-SENSOR
/**************************************** */
CREATE TABLE IF NOT EXISTS rt_sensor (
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
/* USER */
CREATE OR REPLACE VIEW ui_user AS
	SELECT u.id AS 'user_id', firstname, lastname,mail,
		MAX(
			CASE WHEN end_ts IS NULL
				THEN 'online'
	        	ELSE 'offline'
	    	END
	    ) AS status,
	   MAX(
			CASE WHEN end_ts IS NULL
				THEN start_ts
	        	ELSE end_ts
	    	END
	    ) AS last_activity
	FROM log_session s
	JOIN st_user u
	ON s.user_id = u.id
	GROUP BY u.id;

SELECT * FROM ui_user;

/* BUCKET */
CREATE OR REPLACE VIEW ui_bucket AS
	SELECT l.name AS 'location_name', l.city, b.name AS 'bucket_name', b.toads_count, s.mac
	FROM st_bucket b
	JOIN st_location l
	ON b.location_id = l.id
	JOIN st_sensor s
	ON s.bucket_id = b.id;

SELECT * FROM ui_bucket;

/* SENSOR */
CREATE OR REPLACE VIEW sys_sensor AS
	SELECT s.mac AS 'sensor_mac', b.id AS 'bucket_id',b.name AS 'bucket_name'
	FROM st_sensor s
	JOIN st_bucket b
	ON s.bucket_id = b.id;

SELECT * FROM sys_sensor;

/* USER-READINESS */
CREATE OR REPLACE VIEW ui_readiness AS
	SELECT l.name AS 'location_name', l.city, u.firstname, u.lastname, r.start_ts, r.end_ts
	FROM st_location l
	JOIN st_readiness r
	ON r.location_id = l.id
	JOIN st_user u
	ON r.user_id = u.id
	ORDER BY location_name;

SELECT * FROM ui_readiness;


CREATE OR REPLACE VIEW ui_log AS
	SELECT * FROM log;
	
/*-i sample_data.sql;*/