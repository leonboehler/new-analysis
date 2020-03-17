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

DROP FUNCTION IF EXISTS fn_inc_toads//

CREATE FUNCTION fn_inc_toads (pBucketID int(11)) 
    RETURNS varchar(120) DETERMINISTIC
BEGIN
	DECLARE _successful bool DEFAULT false;
	DECLARE _userID int(11);

	IF (pBucketID < 0) THEN
		 SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Please enter a valid mail address.';
	END IF;	       
	
	UPDATE bucket SET toads_count = toads_count + 1 WHERE id = pBucketID;
	IF (ROW_COUNT() > 0) THEN
		SET _successful=true; 
	ELSE
		 SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Could not find a matching bucket-id.';
	END IF;	
	
  
  	return CONCAT('{success: ',IF(_successful,'true','false'),'}');
END //
delimiter ;

SELECT fn_inc_toads(1);