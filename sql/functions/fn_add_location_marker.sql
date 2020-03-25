/**********************************************************************
* Project           : DeHaBewe: Smarte Kroetenzaune
*
* Program name      : fn_add_readiness.sql
*
* Author            : Dominik Deseyve
*
* Purpose           : Increments the toads counter
* PARAMS            : --
* RETURN            : --
/**********************************************************************/
delimiter //

DROP PROCEDURE IF EXISTS fn_add_location_marker//

CREATE PROCEDURE fn_add_location_marker (
	IN pLocationID int(11),
	IN pLatitude decimal(10,7),
	IN Longitude decimal(10,7)
)    
BEGIN	
	INSERT INTO st_location_marker(location_id, latitude, longitude) VALUES(pLocationID, pLatitude, Longitude);
	  	
END //

delimiter ;


