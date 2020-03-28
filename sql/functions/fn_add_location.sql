/**********************************************************************
* Project           : DeHaBewe: Smarte Kroetenzaune
*
* Program name      : fn_add_readiness.sql
*
* Author            : Dominik Deseyve
*
* Purpose           : Increments the toads counter
* PARAMS            : --
* RETURN            : --
/**********************************************************************/
delimiter //

DROP FUNCTION IF EXISTS fn_add_location//

CREATE FUNCTION fn_add_location (
	pName varchar(50),
	pInfo varchar(200), 
	pStreet varchar(50),
	pPLZ varchar(5),
	pCity varchar(50),
	pState varchar(100),
	pCountry varchar(50),	
	pLength decimal(4,2),
	pStationID int(11)
)  
RETURNS int(11)
BEGIN	
	DECLARE _stationID int(11);
	IF (pStationID < 0) THEN
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 501, MESSAGE_TEXT = 'unknown error';
	END IF;	 
	
	INSERT INTO st_location(name, info, street, plz, city, state, country, route_length, station_id) VALUES (pName, pInfo, pStreet, pPLZ, pCity, pState, pCountry, pLength, pStationID);
	RETURN LAST_INSERT_ID();

  	IF (ROW_COUNT() != 1) THEN
  		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 501, MESSAGE_TEXT = 'unknown error';
  	END IF;
END //

delimiter ;


