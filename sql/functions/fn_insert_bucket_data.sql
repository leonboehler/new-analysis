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

DROP PROCEDURE IF EXISTS fn_insert_bucket_data//

CREATE PROCEDURE fn_insert_bucket_data (
	IN pChipID varchar(17), 
	IN pToadsCount int(11),
	IN pBatteryLevel decimal(2,1)
) 
  
BEGIN	
	DECLARE _maxToads int(5);	
	DECLARE _oldToads int(5);

	INSERT INTO rt_bucket(chip_id, toads_count, battery_level) VALUES (pChipID, pToadsCount, pBatteryLevel);

	SELECT bucket_max_toads, bucket_toads_count INTO _maxToads, _oldToads FROM sys_bucket WHERE bucket_chip_id = pChipID;	

	IF(pToadsCount >= _maxToads) THEN		
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 415, MESSAGE_TEXT = 'bucket is full';	
	ELSE 
		UPDATE st_bucket SET toads_count = pToadsCount, battery_level = pBatteryLevel WHERE chip_id = pChipID;
		IF(ROW_COUNT() != 1) THEN
			SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 404, MESSAGE_TEXT = 'chip (or bucket id) is is wrong';	
		END IF;	
		
		IF(pToadsCount > _oldToads) THEN
			SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 502, MESSAGE_TEXT = 'toads count increased - please send mail';	
		END IF;
	END IF;	  	
	
END //
delimiter ;
