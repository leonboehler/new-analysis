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

DROP PROCEDURE IF EXISTS fn_add_assignment//


CREATE PROCEDURE fn_add_assignment (
	IN pUserID int(11),
	IN pLocationID int(11)
)    
BEGIN
	IF (pUserID < 0) THEN
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 401, MESSAGE_TEXT = 'user id wrong';
	END IF;	 
	

	INSERT INTO st_assignment(user_id, location_id) VALUES(pUserID, pLocationID);
  
END //

delimiter ;


