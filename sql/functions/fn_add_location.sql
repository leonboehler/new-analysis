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

DROP PROCEDURE IF EXISTS fn_add_location//

CREATE PROCEDURE fn_add_location (
	IN pName varchar(50),
	IN pInfo varchar(200), 
	IN pStreet varchar(50),
	IN pPLZ varchar(5),
	IN pCity varchar(50),
	IN pState varchar(100),
	IN pCountry varchar(50),	
	IN pLength decimal(4,2),
	IN pStationID int(11)
)    
BEGIN	
	IF (pStationID < 0) THEN
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 501, MESSAGE_TEXT = 'unknown error';
	END IF;	 
	
	INSERT INTO st_location(name, info, street, plz, city, state, country, route_length, station_id) VALUES (pName, pInfo, pStreet, pPLZ, pCity, pState, pCountry, pLength, pStationID);

  	IF (ROW_COUNT() != 1) THEN
  		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 501, MESSAGE_TEXT = 'unknown error';
  	END IF;
END //

delimiter ;


