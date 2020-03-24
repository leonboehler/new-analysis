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
	IN pMail varchar(100),
	IN pStart timestamp, 
	IN pEnd timestamp
)    
BEGIN
	DECLARE _userID int(11);	

	IF(pEnd < pStart) THEN
			SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 501, MESSAGE_TEXT = 'start date should be before end date';
	END IF;


	SELECT id INTO _userID FROM st_user WHERE mail = pMail;
	IF(ROW_COUNT() != 1) THEN
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 401, MESSAGE_TEXT = 'mail is wrong';
	ELSE
		INSERT INTO st_readiness(user_id, start_ts, end_ts) VALUES(_userID, pStart, pEnd);
	END IF;
END //

delimiter ;


