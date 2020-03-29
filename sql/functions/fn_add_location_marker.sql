/**********************************************************************
* Project           : DeHaBewe: Smarte Kroetenzaune
*
* Program name      : fn_add_location_marker.sql
*
* Author            : Dominik Deseyve
*
* Purpose           : Adds a new location marker to the location set
* PARAMS            : pLocationID : 	int(11)
* 					  pLatitude : 		decimal(10,7)
* 					  pLongitude : 		decimal(10,7)
* RETURN            : --
/**********************************************************************/
delimiter //

DROP PROCEDURE IF EXISTS fn_add_location_marker//

CREATE PROCEDURE fn_add_location_marker (
	IN pLocationID int(11),
	IN pLatitude decimal(10,7),
	IN pLongitude decimal(10,7)
)    
BEGIN	
	INSERT INTO st_location_marker(location_id, latitude, longitude) VALUES(pLocationID, pLatitude, pLongitude);
	  	
END //

delimiter ;


