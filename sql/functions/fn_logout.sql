/**********************************************************************
* Project           : DeHaBewe: Smarte Kroetenzaune
*
* Program name      : fn_logout.sql
*
* Author            : Dominik Deseyve
*
* Purpose           : Logout a user
* PARAMS            : pMail:	mail address of the user that wants a logout
* RETURN            : --
/**********************************************************************/
delimiter //

DROP PROCEDURE IF EXISTS fn_logout//

CREATE PROCEDURE fn_logout (
	IN pMail varchar(127)
)  
BEGIN	
	DECLARE _userID int(11);

	IF (pMail = '' OR LENGTH(pMail) <= 5) THEN
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 301, MESSAGE_TEXT = 'enter a valid mail';
	END IF;	       
	
	SELECT id INTO _userID FROM st_user WHERE mail = pMail;
	IF (ROW_COUNT() > 0) THEN
		UPDATE log_session SET end_ts = NOW() WHERE user_id = _userID AND end_ts IS NULL; 		
	ELSE
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 401, MESSAGE_TEXT = 'user id is wrong';
	END IF;	 
END //
delimiter ;
