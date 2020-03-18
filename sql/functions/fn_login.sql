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
	declare _loginSuccessful bool default false;
	DECLARE _password varchar(128);
	DECLARE _userID int(11);
	DECLARE _userStatus varchar(10);

	IF (pMail = '' OR LENGTH(pMail) <= 5) THEN
		 SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Please enter a valid mail address.';
	END IF;

	IF (pPassword = '') THEN
		 SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Please enter a valid password.';
	END IF;
	
	/* Check if user is already logged in -- error */
	SELECT status INTO _userStatus FROM sys_sessioning WHERE user_id = 1;
	IF (_userStatus = 'online') THEN
		 SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User is already logged in';
	END IF;	
       
	SELECT id, password INTO _userID, _password FROM user WHERE mail = pMail;     
 	IF _password = pPassword THEN
	 	INSERT INTO session(user_id, start_ts) VALUES(_userID,NOW());
		SET _loginSuccessful=true;  
 	END IF;
  
  	return CONCAT('{success: ',IF(_loginSuccessful,'true','false'),'}');
END //
delimiter ;

SELECT fn_login('max@mustermann.de','<<hash>>');