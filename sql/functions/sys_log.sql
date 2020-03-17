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

DROP PROCEDURE IF EXISTS sys_log//

CREATE PROCEDURE sys_log(pFunction varchar(256), pText varchar(256))  
	
BEGIN	
	
	INSERT INTO log(log) VALUES(CONCAT(pFunction,' ',pText));	
  	
END //
delimiter ;

