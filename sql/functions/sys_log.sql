/**********************************************************************
* Project           : DeHaBewe: Smarte Kroetenzaune
*
* Program name      : fn_register.sql
*
* Author            : Dominik Deseyve
*
* Purpose           : Function checks whether the user already exists. Then login and register session
* PARAMS            : --
* RETURN            : --
/**********************************************************************/
delimiter //

DROP PROCEDURE IF EXISTS proc_log//

CREATE PROCEDURE proc_log(pFunction varchar(256), pText varchar(256))  
	
BEGIN	
	
	INSERT INTO log(log, user, session_id) VALUES(CONCAT('[',pFunction,']: ',pText),CURRENT_USER(), CONNECTION_ID());	
  	
END //
delimiter ;


