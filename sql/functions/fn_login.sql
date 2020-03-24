/**********************************************************************
* Project           : DeHaBewe: Smarte Kroetenzaune
*
* Program name      : fn_login.sql
*
* Author            : Dominik Deseyve
*
* Purpose           : Function checks whether the user already exists. Then login and register session
* PARAMS            : --
* RETURN            : --
/**********************************************************************/
delimiter //

DROP PROCEDURE IF EXISTS fn_login//

CREATE PROCEDURE fn_login (
	IN pMail varchar(127), 
	IN pPassword varchar(256),
	IN pSessionID varchar(128)
)  
BEGIN	
	DECLARE _password varchar(256);
	DECLARE _userID int(11);
	DECLARE _userStatus varchar(10);

	/* CHECK IF USER EXISTS */
	SELECT id, password INTO _userID, _password FROM st_user WHERE mail = pMail; 

	IF _userID IS NULL THEN
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 411, MESSAGE_TEXT = 'user does not exist';
	END IF;

	/* VALIDATE EMAIL */
	IF (pMail = '' OR LENGTH(pMail) <= 5) THEN
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 301, MESSAGE_TEXT = 'enter a valid mail';
	END IF;

	/* VALIDATE PASSWORD */
	IF (pPassword = '' OR LENGTH(pPassword) <= 2) THEN
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 302, MESSAGE_TEXT = 'enter a valid pw';
	END IF;
	
	/* CHECK IF USER IS ALREADY LOGGED IN */
	SELECT status INTO _userStatus FROM ui_user WHERE user_id = _userID;
	IF (_userStatus = 'online') THEN
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 412, MESSAGE_TEXT = 'user already logged in';
	END IF;	       
	
	IF (_password = pPassword) THEN
	 	INSERT INTO log_session(user_id, start_ts, session_id) VALUES(_userID,NOW(), pSessionID);	
	ELSE 
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 413, MESSAGE_TEXT = 'wrong pw';
 	END IF;
  
  	
END //
delimiter ;
