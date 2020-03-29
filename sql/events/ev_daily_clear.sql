/**********************************************************************
* Project           : DeHaBewe: Smarte Kroetenzaune
*
* Program name      : ev_daily_clear.sql
*
* Author            : Dominik Deseyve
*
* Purpose           : Daily clear of the tables that wont be used anymre
* PARAMS            : --
* RETURN            : --
/**********************************************************************/
SET GLOBAL event_scheduler = ON;

CREATE OR REPLACE EVENT ev_daily_clear
  ON SCHEDULE
    EVERY 1 DAY        
    STARTS DATE_FORMAT(NOW(), "%Y-%m-%d 00:00:00")	/* start the event today at midnight */
  DO CALL sys_daily_clear(); 
delimiter //

DROP PROCEDURE IF EXISTS sys_daily_clear//

CREATE PROCEDURE sys_daily_clear()  
BEGIN
	CALL proc_log('sys_daily_clear', 'PERFORM CLEAR UP');

	/*DELETE FROM log_session WHERE start_ts IS NOT NULL AND end_ts IS NOT NULL;*/
	TRUNCATE log_empty_bucket;	
	TRUNCATE rt_sensor;	
END // 
  
delimiter ;


