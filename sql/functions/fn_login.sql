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

DROP FUNCTION IF EXISTS fn_login//

CREATE FUNCTION fn_login (pMail varchar(127), pPassword varchar(128)) 
   RETURNS varchar(120) DETERMINISTIC
BEGIN	
	DECLARE _password varchar(128);
	DECLARE _userID int(11);
	DECLARE _userStatus varchar(10);

	/* CHECK IF USER EXISTS */
	SELECT id, password INTO _userID, _password FROM st_user WHERE mail = pMail; 
	IF _userID IS NULL THEN
		return '{code: 411, message: "User does not exist"}';
	END IF;

	/* VALIDATE EMAIL */
	IF (pMail = '' OR LENGTH(pMail) <= 5) THEN
		return '{code: 301, message: "Please enter a valid mail address"}';
	END IF;

	/* VALIDATE PASSWORD */
	IF (pPassword = '' OR LENGTH(pPassword) <= 4) THEN
		return '{code: 302, message: "Please enter a valid password"}';
	END IF;
	
	/* CHECK IF USER IS ALREADY LOGGED IN */
	SELECT status INTO _userStatus FROM ui_user WHERE user_id = _userID;
	IF (_userStatus = 'online') THEN
		return '{code: 412, message: "User is already logged in"}';
	END IF;	       
	
	IF (_password = pPassword) THEN
	 	INSERT INTO log_session(user_id, start_ts) VALUES(_userID,NOW());
		return CONCAT('{code: 200, message: "',@MESSAGE_200,'"}');
	ELSE 
		return '{code: 413, message: "Wrong Password"}';
 	END IF;
  
  	
END //
delimiter ;
