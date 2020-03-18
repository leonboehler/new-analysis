/**********************************************************************
* Project           : DeHaBewe: Smarte Kroetenzaune
*
* Program name      : fn_add_readiness.sql
*
* Author            : Dominik Deseyve
*
* Purpose           : Increments the toads counter
* PARAMS            : --
* RETURN            : --
/**********************************************************************/
delimiter //

DROP FUNCTION IF EXISTS fn_add_readiness//


CREATE FUNCTION fn_add_readiness (pUserID int(11), pStart date, pEnd date) 
    RETURNS varchar(120) DETERMINISTIC
BEGIN
	
	
  
END //

delimiter ;


