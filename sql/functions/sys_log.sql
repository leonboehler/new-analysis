/**********************************************************************
* Project           : DeHaBewe: Smarte Kroetenzaune
*
* Program name      : sys_log.sql
*
* Author            : Dominik Deseyve
*
* Purpose           : Internal loggin of called functions or procedures
* PARAMS            : pFunction:	name of the function
* 					  pText:		text what should be logged
* RETURN            : --
/**********************************************************************/
delimiter //

DROP PROCEDURE IF EXISTS proc_log//

CREATE PROCEDURE proc_log(
	IN pFunction varchar(256), 
	IN pText varchar(256)
) 	
BEGIN		
	INSERT INTO log(log, user, session_id) VALUES(CONCAT('[',pFunction,']: ',pText),CURRENT_USER(), CONNECTION_ID());  	
END //
delimiter ;


