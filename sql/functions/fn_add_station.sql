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

DROP FUNCTION IF EXISTS fn_add_station//

CREATE FUNCTION fn_add_station (
	pChipID varchar(17),
	pLatitude decimal(10,7),
	pLongitude decimal(10,7)
)  
RETURNS int(11)
BEGIN	
	
	INSERT INTO st_station(chip_id,  latitude, longitude) VALUES(pChipID, pLatitude, pLongitude);
	RETURN LAST_INSERT_ID();

  	IF (ROW_COUNT() != 1) THEN
  		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 501, MESSAGE_TEXT = 'unknown error';
  	END IF;
END //

delimiter ;


