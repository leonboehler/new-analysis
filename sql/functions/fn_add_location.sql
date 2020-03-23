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
	IN pPLZ varchar(5),
	IN pCity varchar(50),
	IN pCountry varchar(50),
	IN pLatitude decimal(10,7),
	IN pLongitude decimal(10,7)
)    
BEGIN
	
	INSERT INTO st_location(name, info, plz, city, country, latitude, longitude) VALUES (pName, pInfo, pPLZ, pCity, pCountry, pLatitude, pLongitude);

  	IF (ROW_COUNT() != 1) THEN
  		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 501, MESSAGE_TEXT = 'unknown error';
  	END IF;
END //

delimiter ;


