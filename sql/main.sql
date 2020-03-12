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
CREATE TABLE IF NOT EXISTS log (
  id int(11) NOT NULL auto_increment,
  PRIMARY KEY (id),
  log varchar(100) default NULL,
  ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

/**************************************** */
/*** VIEWS
/**************************************** */
CREATE OR REPLACE VIEW ui_log AS
SELECT * FROM log;
#CREATE INDEX;
/**************************************** */
/*** TEST
/**************************************** */
DROP TABLE log;

INSERT INTO log(log) VALUES('test');
SELECT * FROM ui_log;

CREATE OR REPLACE VIEW ui_log AS
SELECT * FROM log;