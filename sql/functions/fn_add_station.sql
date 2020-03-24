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

DROP PROCEDURE IF EXISTS fn_add_station//

CREATE PROCEDURE fn_add_station (
	IN pChipID varchar(17),
	IN pLocationID int(11), 
	IN pLatitude decimal(10,7),
	IN pLongitude decimal(10,7)
)    
BEGIN
	IF (pLocationID < 0) THEN
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 501, MESSAGE_TEXT = 'unknown error';
	END IF;	 
	
	INSERT INTO st_station(chip_id, location_id, latitude, longitude) VALUES(pChipID, pLocationID, pLatitude, pLongitude);
  	IF (ROW_COUNT() != 1) THEN
  		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 501, MESSAGE_TEXT = 'unknown error';
  	END IF;
END //

delimiter ;


