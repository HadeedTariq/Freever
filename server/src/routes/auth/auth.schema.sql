create table siteUser(
	username varchar(20),
	email varchar(255) unique,
	userid serial primary key,
	password text,
	passion varchar [],
	country varchar(40) refreshToken varchar [] forget_password_key varchar(20)
);

create table siteSeller(
	sellerid serial primary key,
	userid int references siteUser(userid) on delete cascade,
	rating numeric(2, 1) default 0.0,
	experience_level VARCHAR(50) NOT NULL
)