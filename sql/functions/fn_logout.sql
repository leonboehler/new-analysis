/**********************************************************************
* Project           : DeHaBewe: Smarte Kroetenzaune
*
* Program name      : fn_inc_toads.sql
*
* Author            : Dominik Deseyve
*
* Purpose           : Increments the toads counter
* PARAMS            : --
* RETURN            : --
/**********************************************************************/
delimiter //

DROP FUNCTION IF EXISTS fn_logout//

CREATE FUNCTION fn_logout (pMail varchar(127)) 
    RETURNS varchar(120) DETERMINISTIC
BEGIN	
	DECLARE _userID int(11);

	IF (pMail = '' OR LENGTH(pMail) <= 5) THEN
		 return '{code: 301, message: "Please enter a valid mail address"}';
	END IF;	       
	
	SELECT id INTO _userID FROM st_user WHERE mail = pMail;
	IF (ROW_COUNT() > 0) THEN
		UPDATE log_session SET end_ts = NOW() WHERE user_id = _userID AND end_ts IS NULL; 	
		return CONCAT('{code: 200, message: "',@MESSAGE_200,'"}'); 
	ELSE
		return '{code: 401, message: "user-id is wrong"}';
	END IF;	 
END //
delimiter ;
