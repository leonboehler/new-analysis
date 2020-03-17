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
	DECLARE _logoutSuccessful bool DEFAULT false;
	DECLARE _userID int(11);

	IF (pMail = '' OR LENGTH(pMail) <= 5) THEN
		 SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Please enter a valid mail address.';
	END IF;	       
	
	SELECT id INTO _userID FROM user WHERE mail = pMail;
	UPDATE session SET end_ts = NOW() WHERE user_id = _userID;
 	SET _logoutSuccessful=true;  
  
  	return CONCAT('{success: ',IF(_logoutSuccessful,'true','false'),'}');
END //
delimiter ;

SELECT fn_logout('max@mustermann.de');