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

DROP TABLE IF EXISTS empty_bucket;
DROP TABLE IF EXISTS bucket;
DROP TABLE IF EXISTS fench;
DROP TABLE IF EXISTS location; 
DROP TABLE IF EXISTS session;
DROP TABLE IF EXISTS user;

/**************************************** */
/*** USER
/**************************************** */
CREATE TABLE IF NOT EXISTS user (		/* USER-TABLE like mentioned in SM05 */
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
CREATE TABLE IF NOT EXISTS session (		/* USER-TABLE like mentioned in SM05 */
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),
  user_id int(11) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
  start_ts varchar(31) default NULL,
  end_ts varchar(31) default NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

/**************************************** */
/*** LOCATION
/**************************************** */
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

/**************************************** */
/*** BUCKET
/**************************************** */
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

/**************************************** */
/*** EMPTY-BUCKET
/**************************************** */
CREATE TABLE IF NOT EXISTS empty_bucket (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),
  bucket_id int(11) DEFAULT NULL,
  FOREIGN KEY (bucket_id) REFERENCES bucket(id),
  user_id int(11) DEFAULT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

/**************************************** */
/*** FENCH
/**************************************** */
CREATE TABLE IF NOT EXISTS fench (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),
  location_id int(11) DEFAULT NULL,
  FOREIGN KEY (location_id) REFERENCES location(id),
  name varchar(100) default NULL,  
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

CREATE OR REPLACE VIEW sys_sessioning AS
	SELECT firstname, lastname,mail, start_ts, end_ts
	FROM session s
	JOIN user u
	ON s.user_id = u.id;

CREATE OR REPLACE VIEW ui_log AS
	SELECT * FROM log;