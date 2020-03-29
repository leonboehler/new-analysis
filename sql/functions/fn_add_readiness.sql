/**********************************************************************
* Project           : DeHaBewe: Smarte Kroetenzaune
*
* Program name      : fn_add_readiness.sql
*
* Author            : Dominik Deseyve
*
* Purpose           : Adds a new readiness for a user
* PARAMS            : pMail:	mail address to identify a user
* 					  pTime:	time of a day when the user wants to be notified
* RETURN            : --
/**********************************************************************/
delimiter //

DROP PROCEDURE IF EXISTS fn_add_readiness//

CREATE PROCEDURE fn_add_readiness (
	IN pMail varchar(100),
	IN pTime time	
)    
BEGIN
	DECLARE _userID int(11);		

	SELECT id INTO _userID FROM st_user WHERE mail = pMail;
	IF(ROW_COUNT() != 1) THEN
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 401, MESSAGE_TEXT = 'mail is wrong';
	ELSE
		INSERT INTO st_readiness(user_id, time) VALUES(_userID, pTime);
	END IF;
END //

delimiter ;


