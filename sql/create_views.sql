/**********************************************************************
* Project           : DeHaBewe: Smarte Kroetenzaune
*
* Program name      : views.sql
*
* Author            : Dominik Deseyve
*
* Purpose           : Create all views for system and ui
* 
/**********************************************************************/
/**************************************** */
/*** SYS-VIEWS
/**************************************** */
### USER
CREATE OR REPLACE VIEW sys_user AS
	SELECT u.id AS 'user_id', firstname, lastname, birthday, mail, phone, street, streetnumber, plz, city, state, country, role AS 'role',
		MAX(
			CASE WHEN start_ts IS NULL AND end_ts IS NULL
					THEN 'false'
				 WHEN end_ts IS NULL
					THEN 'online'
	        	 ELSE 'offline'
	    	END
	    ) AS status,
	   MAX(
			CASE WHEN start_ts IS NULL AND end_ts IS NULL
					THEN 'not logged in yet'				 
				 WHEN end_ts IS NULL
					THEN start_ts
	        	ELSE end_ts
	    	END
	    ) AS last_activity
	FROM st_user u
	LEFT JOIN log_session s
	ON s.user_id = u.id
	GROUP BY u.id;

SELECT * FROM sys_user;

### BUCKET 
CREATE OR REPLACE VIEW sys_bucket AS
	SELECT b.id AS 'bucket_id', b.name AS 'bucket_name', b.chip_id AS 'bucket_chip_id', b.max_toads AS 'bucket_max_toads', b.toads_count AS 'bucket_toads_count', b.battery_level AS 'bucket_battery_level', b.latitude AS 'bucket_latitude', b.longitude AS 'bucket_longitude', l.id AS 'location_id', l.name AS 'location_name'
	FROM st_bucket b	
	JOIN st_location l
	ON b.location_id = l.id;
	
SELECT * FROM sys_bucket;

### LOCATION
CREATE OR REPLACE VIEW sys_location AS
	SELECT 
		l.id AS 'location_id', 
		l.name AS 'location_name', 
		l.station_id AS 'location_station_id',
		l.city AS 'location_city',
		l.country AS 'location_country', 	
		SUM(b.bucket_toads_count) AS 'location_toads_count', 
		COUNT(b.bucket_id) AS 'location_bucket_count',
		b.bucket_id
	FROM st_location l
	LEFT JOIN sys_bucket b
	ON b.location_id = l.id
	GROUP BY l.id;

SELECT * FROM sys_location;

### LOCATION-MARKER
CREATE OR REPLACE VIEW sys_location_marker AS
	SELECT *		
	FROM st_location_marker m;	
	
SELECT * FROM sys_location_marker;

### READINESS
CREATE OR REPLACE VIEW sys_readiness AS
	SELECT u.user_id, u.mail AS 'user_mail', r.time
	FROM sys_user u	
	JOIN st_readiness r
	ON r.user_id = u.user_id;	
		
SELECT * FROM sys_readiness;

### ASSIGNMENT
CREATE OR REPLACE VIEW sys_assignment AS
	SELECT u.id AS 'user_id', u.mail AS 'user_mail', l.id AS 'location_id', l.name AS 'location_name'
	FROM st_assignment a
	LEFT JOIN st_user u
	ON a.user_id = u.id
	LEFT JOIN st_location l
	ON a.location_id = l.id;
		
SELECT * FROM sys_assignment;

### STATION 
CREATE OR REPLACE VIEW sys_station AS
	SELECT s.id AS 'station_id', s.chip_id AS 'station_chip_id', s.latitude AS 'station_latitude', s.longitude AS 'station_longitude', l.location_id, l.location_name
	FROM st_station s
	JOIN sys_location l	
	ON l.location_station_id = s.id;
	
SELECT * FROM sys_station;

/**************************************** */
/*** UI-VIEWS
/**************************************** */
### USER
CREATE OR REPLACE VIEW ui_user AS
	SELECT * 
	FROM sys_user;

SELECT * FROM ui_user;

### STATION
CREATE OR REPLACE VIEW ui_station AS
	SELECT * 
	FROM sys_station s;
	
SELECT * FROM ui_station;

### LOCATION
CREATE OR REPLACE VIEW ui_location AS
	SELECT *
	FROM sys_location l;
	
SELECT * FROM ui_location WHERE location_id = 1;

### LOCATION-MARKER
CREATE OR REPLACE VIEW ui_location_marker AS
	SELECT *
	FROM sys_location_marker l;
	
SELECT * FROM ui_location_marker WHERE location_id = 3;

### BUCKET
CREATE OR REPLACE VIEW ui_bucket AS
	SELECT *
	FROM sys_bucket b
	ORDER BY b.bucket_name;
	
SELECT * FROM ui_bucket;

### READINESS
CREATE OR REPLACE VIEW ui_readiness AS
	SELECT *
	FROM sys_readiness;

SELECT * FROM ui_readiness;

### MAILING
CREATE OR REPLACE VIEW ui_mailing AS
	SELECT u.mail AS 'user_mail', r.time, b.bucket_name, b.bucket_toads_count, b.bucket_max_toads
	FROM st_user u	
	JOIN sys_assignment a
	ON a.user_id = u.id
	JOIN sys_readiness r
	ON r.user_id = u.id
	JOIN sys_bucket b
	ON a.location_id = b.location_id;

SELECT * FROM ui_mailing;

### ASSIGNMENT
CREATE OR REPLACE VIEW ui_assignment AS
	SELECT *
	FROM sys_assignment;

SELECT * FROM ui_assignment;


/**************************************** */
/*** UI-VIEW: LOG
/**************************************** */
CREATE OR REPLACE VIEW ui_log AS
	SELECT * FROM log;