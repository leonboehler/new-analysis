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

CREATE FUNCTION fn_inc_toads (pBucketID int(11), pCount int(11)) 
    RETURNS varchar(120) DETERMINISTIC
BEGIN	
	IF (pBucketID < 0) THEN
		return '{code: 402, message: "bucket id is wrong"}';
	END IF;	       
	
	INSERT INTO log_bucket(bucket_id, toads_count) VALUES (pBucketID, pCount);
	UPDATE st_bucket SET toads_count = toads_count + pCount WHERE id = pBucketID;
	IF (ROW_COUNT() > 0) THEN
		return CONCAT('{code: 200, message: "',@MESSAGE_200,'"}');
	ELSE
		return '{code: 402, message: "bucket id is wrong"}';
	END IF;	  	
END //
delimiter ;
