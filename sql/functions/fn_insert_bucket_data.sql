/**********************************************************************
* Project           : DeHaBewe: Smarte Kroetenzaune
*
* Program name      : fn_insert_bucket_data.sql
*
* Author            : Dominik Deseyve
*
* Purpose           : Insert the bucket data received by the station module
* PARAMS            : pChipID :			varchar(17)
* 					  pToadsCount : 	int(11)
* 					  pBatteryLevel : 	decimal(5,2)
* RETURN            : --
/**********************************************************************/
delimiter //

DROP PROCEDURE IF EXISTS fn_insert_bucket_data//

CREATE PROCEDURE fn_insert_bucket_data (
	IN pChipID varchar(17), 
	IN pToadsCount int(11),
	IN pBatteryLevel decimal(5,2)
)   
BEGIN	
	
	SET AUTOCOMMIT = 0;
	START TRANSACTION;

	INSERT INTO rt_bucket(chip_id, toads_count, battery_level) VALUES (pChipID, pToadsCount, pBatteryLevel);	
	UPDATE st_bucket SET toads_count = pToadsCount, battery_level = pBatteryLevel WHERE chip_id = pChipID;

	IF(ROW_COUNT() != 1) THEN
		SET AUTOCOMMIT = 1;
		COMMIT;
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 404, MESSAGE_TEXT = 'chip (or bucket id) is is wrong';	
	ELSE 
		SET AUTOCOMMIT = 0;
		ROLLBACK;
	END IF;		
	
END //
delimiter ;
