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

DROP FUNCTION IF EXISTS fn_empty_bucket//


CREATE FUNCTION fn_empty_bucket (pBucketID int(11), pUserID int(11)) 
    RETURNS varchar(120) DETERMINISTIC
BEGIN
	DECLARE _toadsCount int(11);
		
	IF (pBucketID < 0) THEN
		 return '{code: 402, message: "bucket-id is wrong"}';
	END IF;	  

	IF (pUserID < 0) THEN
		return '{code: 401, message: "user-id is wrong"}';
	END IF;	 
	
	SELECT toads_count INTO _toadsCount FROM st_bucket WHERE id = pBucketID;
	IF (_toadsCount = 0) THEN
		return '{code: 414, message: "bucket cant be cleared because its already empty"}';
	ELSE
		/*START TRANSACTION*/
		INSERT INTO log_empty_bucket(user_id, bucket_id, toads_count) VALUES(pUserID, pBucketID, _toadsCount);
		UPDATE st_bucket SET toads_count = 0 WHERE id = pBucketID;		
		IF (ROW_COUNT() > 0) THEN
			/*END TRANSACTION*/ 
			
			return CONCAT('{code: 200, message: "',@MESSAGE_200,'"}');
		ELSE
			/*END TRANSACTION*/  
			
			return '{code: 402, message: "bucket-id is wrong"}';
		END IF;	
	END IF;
	
  
END //

delimiter ;


