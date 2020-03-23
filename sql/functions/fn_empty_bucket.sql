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

DROP PROCEDURE IF EXISTS fn_empty_bucket//


CREATE PROCEDURE fn_empty_bucket (
	IN pBucketID int(11),
	IN pUserID int(11)
)
  
BEGIN
	DECLARE _toadsCount int(11);
		
	IF (pBucketID < 0) THEN
		 SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 402, MESSAGE_TEXT = 'bucket id is wrong';
	END IF;	  

	IF (pUserID < 0) THEN
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 401, MESSAGE_TEXT = 'user id wrong';
	END IF;	 
	
	SELECT toads_count INTO _toadsCount FROM st_bucket WHERE id = pBucketID;
	IF (_toadsCount = 0) THEN
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 414, MESSAGE_TEXT = 'bucket already empty';
	ELSE
		/*START TRANSACTION*/
		SET AUTOCOMMIT = 0;
		START TRANSACTION;
		INSERT INTO log_empty_bucket(user_id, bucket_id, toads_count) VALUES(pUserID, pBucketID, _toadsCount);
		UPDATE st_bucket SET toads_count = 0 WHERE id = pBucketID;		
		IF (ROW_COUNT() != 1) THEN
			/*END TRANSACTION*/
			ROLLBACK;
			SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 402, MESSAGE_TEXT = 'bucket id is wrong';
		ELSE
			COMMIT;
			/*END TRANSACTION*/  			
			
		END IF;	
	END IF;
	
  
END //

delimiter ;


