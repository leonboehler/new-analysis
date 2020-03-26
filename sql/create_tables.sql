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
SET time_zone = "+01:00";

DROP TABLE IF EXISTS rt_station;
DROP TABLE IF EXISTS rt_bucket;
DROP TABLE IF EXISTS st_bucket;
DROP TABLE IF EXISTS st_readiness;
DROP TABLE IF EXISTS st_assignment;
DROP TABLE IF EXISTS st_location_marker;
DROP TABLE IF EXISTS st_location;
DROP TABLE IF EXISTS st_station;
DROP TABLE IF EXISTS log_session;
DROP TABLE IF EXISTS st_user;
DROP TABLE IF EXISTS sys_config;

/**************************************** */
/*** CONFIG
/**************************************** */	
CREATE TABLE IF NOT EXISTS sys_config (		/* USER-TABLE like mentioned in SM05 */
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),  
  name varchar(100),
  value varchar(256) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

INSERT INTO sys_config(name, value) VALUES ('session_id_station','a181f342661a20e112bcc86323b4cfbf88e20cfda4ed8a7c7414b1c1e2c47a4e');

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
  password varchar(256) default NULL,
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
/*** STADION
/**************************************** */
CREATE TABLE IF NOT EXISTS st_station (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id), 
  chip_id int(11) NOT NULL, 
  UNIQUE KEY(chip_id), 
  latitude DECIMAL(10,7) default NULL,
  longitude DECIMAL(10,7) default NULL,  
  battery_level decimal(2,1) default NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;


/**************************************** */
/*** LOCATION
/**************************************** */
CREATE TABLE IF NOT EXISTS st_location (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),
  name varchar(100) default NULL,
  info varchar(200) default NULL, 
  street varchar(100) default NULL, 
  plz varchar(5) default NULL,
  city varchar(127) default NULL,
  state varchar(100) default NULL,
  country VARCHAR(100) default 'Deutschland', 
  route_length DECIMAL(4,2) default NULL, 
  station_id int(11) NOT NULL,
  FOREIGN KEY (station_id) REFERENCES st_station(id) ON DELETE CASCADE ON UPDATE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

/**************************************** */
/*** LOCATION-MARKER
/**************************************** */
CREATE TABLE IF NOT EXISTS st_location_marker (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),  
  location_id int(11) NOT NULL,
  FOREIGN KEY (location_id) REFERENCES st_location(id) ON DELETE CASCADE ON UPDATE CASCADE,  
  latitude DECIMAL(10,7) default NULL,
  longitude DECIMAL(10,7) default NULL,  
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
  time time NULL default NULL, 
  UNIQUE(user_id, time),
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
  UNIQUE(user_id, location_id),
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
  chip_id int(11) NOT NULL, 
  UNIQUE KEY(chip_id), 
  latitude DECIMAL(10,7) default NULL,
  longitude DECIMAL(10,7) default NULL,
  toads_count int(11) default 0,
  max_toads int(11) default NULL,  
  battery_level decimal(2,1) default NULL,
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
/*** RUNTIME-TABLE: STATION
/**************************************** */
CREATE TABLE IF NOT EXISTS rt_station (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),  
  chip_id int(11) NOT NULL,   
  battery_level decimal(2,1) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

/**************************************** */
/*** RUNTIME-TABLE: BUCKET
/**************************************** */
CREATE TABLE IF NOT EXISTS rt_bucket (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),  
  chip_id int(11) NOT NULL,
  toads_count int(11) NOT NULL,
  battery_level decimal(2,1) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;


/**************************************** */
/*** USER: SERVER
/**************************************** */
DROP USER IF EXISTS server;
CREATE USER 'server'@'%' IDENTIFIED BY "dhbw2020#";
GRANT EXECUTE ON dehabewe.* TO server WITH max_user_connections 10;
GRANT SELECT ON dehabewe.ui_bucket TO server;
GRANT SELECT ON dehabewe.ui_user TO server;
GRANT SELECT ON dehabewe.ui_location TO server;
GRANT SELECT ON dehabewe.ui_location_marker TO server;
GRANT SELECT ON dehabewe.ui_station TO server;
GRANT SELECT ON dehabewe.ui_assignment TO server;
GRANT SELECT ON dehabewe.ui_readiness TO server;
flush PRIVILEGES;

/*select * from mysql.user;*/