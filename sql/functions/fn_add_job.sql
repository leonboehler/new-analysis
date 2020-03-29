/**********************************************************************
* Project           : DeHaBewe: Smarte Kroetenzaune
*
* Program name      : fn_add_job.sql
*
* Author            : Dominik Deseyve
*
* Purpose           : Adds a new job to a user to empty a bucket
* PARAMS            : pUserID:		foreign-key of the user
* 					  pBucketID:	foreign-key of the bucket.
* RETURN            : --
/**********************************************************************/
delimiter //

DROP PROCEDURE IF EXISTS fn_add_job//

CREATE PROCEDURE fn_add_job (
	IN pUserID int(11),
	IN pBucketID int(11)
)    
BEGIN
	INSERT INTO st_job(user_id, bucket_id) VALUES(pUserID, pBucketID);  
END //

delimiter ;


