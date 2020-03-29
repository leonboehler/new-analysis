/**********************************************************************
* Project           : DeHaBewe: Smarte Kroetenzaune
*
* Program name      : fn_add_bucket.sql
*
* Author            : Dominik Deseyve
*
* Purpose           : Adds a new bucket
* PARAMS            : pChipID:		unique identifier of the bucket (like mac address)
* 					  pName:		name of the bucket
* 					  pMaxToads:	amount of the max possible toads within a bucket
* 					  pLocationID:	foreign-key of the location
* 				      pLatitude:	latitude coordinate
* 					  pLongitude: 	longitude coordinate
* 
* RETURN            : ID:			identifier of the inserted bucket
/**********************************************************************/
delimiter //

DROP FUNCTION IF EXISTS fn_add_bucket//

CREATE FUNCTION fn_add_bucket (
	pChipID varchar(17),
	pName varchar(50),
	pMaxToads int(3), 
	pLocationID int(11),
	pLatitude decimal(10,7),
	Longitude decimal(10,7)
)    
RETURNS int(11)
BEGIN
	IF (pMaxToads < 0) THEN
		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 501, MESSAGE_TEXT = 'unknown error';
	END IF;	 
	
	INSERT INTO st_bucket(chip_id, name, max_toads, location_id, latitude, longitude) VALUES(pChipID, pName, pMaxToads, (SELECT id FROM st_location WHERE id = pLocationID), pLatitude, Longitude);
	RETURN LAST_INSERT_ID();

  	IF (ROW_COUNT() != 1) THEN
  		SIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 501, MESSAGE_TEXT = 'unknown error';
  	END IF;
END //

delimiter ;


