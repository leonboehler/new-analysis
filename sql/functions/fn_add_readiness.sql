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

DROP PROCEDURE IF EXISTS fn_add_readiness//


CREATE PROCEDURE fn_add_readiness (
	IN pUserID int(11),
	IN pStart timestamp, 
	IN pEnd timestamp
)    
BEGIN
	IF (pUserID < 0) THEN
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 401, MESSAGE_TEXT = 'user id wrong';
	END IF;	 

	IF(pEnd < pStart) THEN
			SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 501, MESSAGE_TEXT = 'start date should be before end date';
	END IF;
	INSERT INTO st_readiness(user_id, start_ts, end_ts) VALUES(pUserID, pStart, pEnd);
  
END //

delimiter ;


