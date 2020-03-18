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

INSERT INTO st_user(firstname, lastname, birthday,plz,city,password,mail) VALUES('Max','Mustermann','2002-06-03','88400','Biberach an der Riﬂ','<<hash>>', 'max@mustermann.de');
INSERT INTO st_location(name, latitude, longitude) VALUES('Buchenwald', 19.311143, 1.582031);

INSERT INTO st_bucket(name, location_id) VALUES('Eimer 23', (SELECT id FROM st_location LIMIT 1));
INSERT INTO st_readiness(location_id, user_id, start_ts, end_ts) VALUES((SELECT id FROM st_location LIMIT 1),(SELECT id FROM st_location LIMIT 1), NOW(), (NOW() + INTERVAL 1 DAY));


SELECT fn_login('max12@musterm32ann.de', '<<hash>>') AS login_result;
SELECT fn_logout('max12@musterm32ann.de') AS logout_result;

SELECT fn_register('Max','Mustermann','max12@musterm32ann.de','<<hash>>') AS register_result;


SELECT fn_inc_toads(1, 10);

SET AUTOCOMMIT = 0;
START TRANSACTION;
SELECT fn_empty_bucket(1,1);
COMMIT;
SET AUTOCOMMIT = 1;

