/**********************************************************************
* Project           : DeHaBewe: Smarte Kroetenzaune
*
* Program name      : fn_add_assignment.sql
*
* Author            : Dominik Deseyve
*
* Purpose           : Adds a new assignment for the user according to a bucket.
* PARAMS            : pMail:		mail address of the user to identify the user-id
* 					  pLocation:	foreign-key of the location.
* RETURN            : --
/**********************************************************************/
delimiter //

DROP PROCEDURE IF EXISTS fn_add_assignment//


CREATE PROCEDURE fn_add_assignment (
	IN pMail varchar(100),
	IN pLocationID int(11)
)    
BEGIN
	DECLARE _userID int(11);

	SELECT id INTO _userID FROM st_user WHERE mail = pMail;

	IF(ROW_COUNT() != 1) THEN
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 401, MESSAGE_TEXT = 'mail is wrong';
	ELSE
		INSERT INTO st_assignment(user_id, location_id) VALUES(_userID, pLocationID);
	END IF;
  
END //

delimiter ;


