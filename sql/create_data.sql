/**********************************************************************
* Project           : DeHaBewe: Smarte Kroetenzaune
*
* Program name      : sample_data.sql
*
* Author            : Dominik Deseyve
*
* Purpose           : Fill tables with sample data
* 
/**********************************************************************/

CALL fn_register('Max','Mustermann','2002-06-03','07351-1111','Musterstraﬂe','101a/1', '88400', 'Biberach an der Riﬂ', 'Baden-W¸rttemberg', 'Germany', 'max@mustermann.de', '<<hash>>', 'ADMIN');

CALL fn_login('max@mustermann.de', '<<hash>>', '<<session_id>>');

CALL fn_verify('a181f342661a20e112bcc86323b4cfbf88e20cfda4ed8a7c7414b1c1e2c47a4e');

CALL fn_logout('max@mustermann.de');

CALL fn_add_readiness('max@mustermann.de' /*USER-MAIL*/,'2020-03-21 16:00:00','2020-03-21 18:30:00');

CALL fn_add_assignment('max@mustermann.de' /*USER-MAIL*/,2 /*LOCATION-ID*/);

CALL fn_add_location('Birkenwald', 'Der Buchenwald neben der Kirche', '88400', 'Biberach an der Riﬂ', 'Germany', 19.311143/*LAT*/, 1.582031 /*LONG*/ ,19.311143 /*START-LAT*/, 1.582031 /*START-LONG*/,19.311143/*END-LAT*/, 1.582031/*END-LONG*/);

CALL fn_add_bucket(1111111,'Eimer 1', 50 /*MAX-TOADS*/, 1/*LOCATION-ID*/, 19.311143, 1.582031);

CALL fn_add_station(222222222, 1 /*LOCATION-ID*/, 19.311143, 1.582031);

CALL fn_insert_bucket_data(1111111, 10, 2.2);

CALL fn_insert_station_data(222222222, 2.2);

/**************************************** */
/*** UPDATE
/**************************************** */

UPDATE st_user SET lastname = 'Musetfrau',/* ,... */ WHERE mail = 'max@mustermann.de';

UPDATE st_location SET name = 'Neuer Name' WHERE id = 1;

UPDATE st_bucket SET name = 'Neuer Name' WHERE id = 1;

UPDATE st_readiness SET name = 'Neuer Name' WHERE id = 1;

DELETE FROM st_user WHERE id = 1;

DELETE FROM st_location WHERE id = 1;

DELETE FROM st_bucket WHERE id = 2;

DELETE FROM st_assignment WHERE id = 1;

SELECT * FROM ui_location;

SELECT * FROM ui_location;

SELECT bucket_id, bucket_name, bucket_toads_count, bucket_max_toads, bucket_battery_level, bucket_latitude, bucket_longitude FROM ui_bucket WHERE bucket_id = 1;


SELECT * FROM ui_user;

SELECT * FROM ui_readiness WHERE user_mail = 'max@mustermann.de';

SELECT * FROM ui_assignment WHERE user_mail = 'max@mustermann.de';

SELECT * FROM ui_statistics;
