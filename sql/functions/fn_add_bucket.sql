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

DROP PROCEDURE IF EXISTS fn_add_bucket//

CREATE PROCEDURE fn_add_bucket (
	IN pChipID varchar(17),
	IN pName varchar(50),
	IN pMaxToads int(3), 
	IN pLocationID int(11),
	IN pLatitude decimal(10,7),
	IN Longitude decimal(10,7)
)    
BEGIN
	IF (pMaxToads < 0) THEN
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 501, MESSAGE_TEXT = 'unknown error';
	END IF;	 
	
	INSERT INTO st_bucket(chip_id, name, max_toads, location_id, latitude, longitude) VALUES(pChipID, pName, pMaxToads, (SELECT id FROM st_location WHERE id = pLocationID), pLatitude, Longitude);

  	IF (ROW_COUNT() != 1) THEN
  		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 501, MESSAGE_TEXT = 'unknown error';
  	END IF;
END //

delimiter ;


