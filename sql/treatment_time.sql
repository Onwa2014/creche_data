create table medication (
	id int not null auto_increment,
	meds_date date,
	child_id int not null,
	primary key(id),
	foreign key (child_id) references children(id)
);