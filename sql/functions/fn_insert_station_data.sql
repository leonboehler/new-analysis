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

DROP PROCEDURE IF EXISTS fn_insert_station_data//

CREATE PROCEDURE fn_insert_station_data (
	IN pChipID int(11), 	
	IN pBatteryLevel decimal(2,1)
)   
BEGIN	
	
	INSERT INTO rt_station(chip_id,  battery_level) VALUES (pChipID, pBatteryLevel);

	UPDATE st_station SET battery_level = pBatteryLevel WHERE chip_id = pChipID;
	IF (ROW_COUNT() != 1) THEN
  		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 404, MESSAGE_TEXT = 'chip-id (or bucket id) is wrong';
  	END IF;
	
END //
delimiter ;
