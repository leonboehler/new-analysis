/**********************************************************************
* Project           : DeHaBewe: Smarte Kroetenzaunedehabewe.st_bucket
*
* Program name      : create_user.sql
*
* Author            : Dominik Deseyve
*
* Purpose           : Create all neccessary user
* 
/**********************************************************************/

/**************************************** */
/*** SERVER WITH REST-API
/**************************************** */
DROP USER IF EXISTS server;
CREATE USER 'server'@'%' IDENTIFIED BY "dhbw2020#";
GRANT SELECT, EXECUTE, UPDATE, DELETE ON dehabewe.* TO server WITH max_user_connections 10;
GRANT SELECT ON dehabewe.ui_bucket TO server;
GRANT SELECT ON dehabewe.ui_job TO server;
GRANT SELECT ON dehabewe.ui_user TO server;
GRANT SELECT ON dehabewe.ui_mailing TO server;
GRANT SELECT ON dehabewe.ui_location TO server;
GRANT SELECT ON dehabewe.ui_location_marker TO server;
GRANT SELECT ON dehabewe.ui_station TO server;
GRANT SELECT ON dehabewe.ui_assignment TO server;
GRANT SELECT ON dehabewe.ui_readiness TO server;
flush PRIVILEGES;

/**************************************** */
/*** UNITTEST
/**************************************** */
DROP USER IF EXISTS unittest;
CREATE USER 'unittest'@'%' IDENTIFIED BY "dhbw2020#";
GRANT EXECUTE, UPDATE, DELETE ON dehabewe.* TO unittest WITH max_user_connections 5;
GRANT DROP ON dehabewe.* TO unittest;
GRANT SELECT ON dehabewe.ui_bucket TO unittest;
GRANT SELECT ON dehabewe.ui_user TO unittest;
GRANT SELECT ON dehabewe.ui_mailing TO unittest;
GRANT SELECT ON dehabewe.ui_location TO unittest;
GRANT SELECT ON dehabewe.ui_location_marker TO unittest;
GRANT SELECT ON dehabewe.ui_station TO unittest;
GRANT SELECT ON dehabewe.ui_assignment TO unittest;
GRANT SELECT ON dehabewe.ui_readiness TO unittest;
flush PRIVILEGES;

/*select * from mysql.user;*/