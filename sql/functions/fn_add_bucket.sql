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
	IN pMac varchar(17),
	IN pName varchar(50),
	IN pMaxToads int(3), 
	IN pLocationID int(11)
)    
BEGIN
	IF (pMaxToads < 0) THEN
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 501, MESSAGE_TEXT = 'unknown error';
	END IF;	 
	
	INSERT INTO st_bucket(mac, name, max_toads, location_id) VALUES(pMac, pName, pMaxToads, (SELECT id FROM st_location WHERE id = pLocationID));
  	IF (ROW_COUNT() != 1) THEN
  		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 501, MESSAGE_TEXT = 'unknown error';
  	END IF;
END //

delimiter ;


