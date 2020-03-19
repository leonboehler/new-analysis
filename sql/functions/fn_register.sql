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

DROP PROCEDURE IF EXISTS fn_register//

CREATE PROCEDURE fn_register (
	IN pFirstname varchar(127),
	IN pLastname varchar(127),
	IN pBirthday date,
	IN pPLZ varchar(5),
	IN pCity varchar(100),
	IN pMail varchar(127),
	IN pPassword varchar(128)
)  
BEGIN
	CALL proc_log('fn_register', 'REGISTER USER');

	IF (pMail = '' OR LENGTH(pMail) <= 5) THEN
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 301, MESSAGE_TEXT = 'please enter a valid mail';
	END IF;	       
	
 	INSERT INTO st_user(firstname, lastname, birthday, plz, city, mail, password) VALUES(pFirstname, pLastname, pBirthday, pPLZ, pCity, pMail, pPassword);

	IF (ROW_COUNT() != 1) THEN
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 501, MESSAGE_TEXT = 'unknown error';
	END IF;	  	
END //
delimiter ;

