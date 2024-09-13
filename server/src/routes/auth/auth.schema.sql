create table siteUser(
	username varchar(20),
	email varchar(255) unique,
	userid serial primary key,
	password text,
	passion varchar[],
	country varchar(40)
	refreshToken varchar[]
)