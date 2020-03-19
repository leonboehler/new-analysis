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

DROP PROCEDURE IF EXISTS fn_inc_toads//

CREATE PROCEDURE fn_inc_toads (IN pMac varchar(17), IN pCount int(11)) 
  
BEGIN	
	DECLARE _bucketID int(11);

	IF (LENGTH(pMac) < 17) THEN
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 402, MESSAGE_TEXT = 'mac id is wrong';
	END IF;	       
	
	SET AUTOCOMMIT = 0;
	START TRANSACTION;
	INSERT INTO rt_sensor(mac, toads_count) VALUES (pMac, pCount);
	SELECT bucket_id INTO _bucketID FROM sys_sensor WHERE sensor_mac = pMac;
	UPDATE st_bucket SET toads_count = toads_count + pCount WHERE id = _bucketID;
	IF (ROW_COUNT() != 1) THEN	
		ROLLBACK;
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 402, MESSAGE_TEXT = 'bucket id is wrong';
	ELSE 
		COMMIT;
	END IF;	  	
END //
delimiter ;
