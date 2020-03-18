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

DROP FUNCTION IF EXISTS fn_register//

CREATE FUNCTION fn_register(pFirstname varchar(127), pLastname varchar(127), pMail varchar(127), pPassword varchar(128)) 
   RETURNS varchar(120) DETERMINISTIC
BEGIN
	DECLARE _successful bool default false;	
	
	CALL proc_log('fn_register', 'REGISTER USER');

	IF (pMail = '' OR LENGTH(pMail) <= 5) THEN
		 SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Please enter a valid mail address.';
	END IF;	
       
	
 	INSERT INTO user(firstname, lastname, birthday, plz, city, mail, password) VALUES(pFirstname, pLastname,'2002-06-03','88400','Biberach an der Riß', pMail, pPassword);

	IF (ROW_COUNT() > 0) THEN
		SET _successful=true; 
	ELSE
		 SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Failed.';
	END IF;	
 
  
  	RETURN CONCAT('{success: ',IF(_successful,'true','false'),'}');
END //
delimiter ;

SELECT fn_register('Max','Mustermann','max12@musterm32ann.de','<<hash>>');