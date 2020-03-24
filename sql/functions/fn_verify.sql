/**********************************************************************
* Project           : DeHaBewe: Smarte Kroetenzaune
*
* Program name      : fn_verify.sql
*
* Author            : Dominik Deseyve
*
* Purpose           : Increments the toads counter
* PARAMS            : --
* RETURN            : --
/**********************************************************************/
delimiter //

DROP PROCEDURE IF EXISTS fn_verify//

CREATE PROCEDURE fn_verify (
	IN pSessionID varchar(128)
)
BEGIN	
	DECLARE _sessionID varchar(128);
	
	SELECT session_id INTO _sessionID FROM log_session WHERE end_ts IS NULL AND session_id = pSessionID;	

	IF (ROW_COUNT() != 1) THEN	
	
		SELECT value INTO _sessionID FROM sys_config WHERE value = pSessionID;
		IF (ROW_COUNT() != 1) THEN
			SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 303, MESSAGE_TEXT = 'session id is wrong';	
		END IF;
	END IF;	  	
END //
delimiter ;
