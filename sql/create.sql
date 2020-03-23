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
  phone varchar(20) default NULL,
  street varchar(50) default NULL,
  streetnumber varchar(10) default NULL,
  plz varchar(5) default NULL,
  city varchar(127) default NULL,
  state varchar(100) default NULL,
  country varchar(100) default NULL,
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
/*** USER: SERVER
/**************************************** */
DROP USER IF EXISTS server;
CREATE USER 'server'@'%' IDENTIFIED BY "dhbw2020#";
GRANT EXECUTE ON dehabewe.* TO server WITH max_user_connections 5;
GRANT SELECT ON dehabewe.ui_bucket TO server;
GRANT SELECT ON dehabewe.ui_user TO server;
GRANT SELECT ON dehabewe.ui_user_profile TO server;
GRANT SELECT ON dehabewe.ui_location TO server;
GRANT SELECT ON dehabewe.ui_readiness TO server;
flush PRIVILEGES;

/*select * from mysql.user;*/