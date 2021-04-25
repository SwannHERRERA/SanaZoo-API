create table Enclosure_Type
(
    id         bigint auto_increment
        primary key,
    name       varchar(255) null,
    created_at datetime     not null,
    updated_at datetime     not null,
    constraint name
        unique (name)
);

create table Enclosure
(
    id                bigint auto_increment
        primary key,
    name              varchar(255) null,
    description       varchar(255) null,
    capacity          int          null,
    visit_duration    int          null,
    handicap_access   tinyint(1)   null,
    maintenance       tinyint(1)   null,
    open_hour         varchar(255) null,
    close_hour        varchar(255) null,
    enclosure_type_id bigint       null,
    created_at        datetime     not null,
    updated_at        datetime     not null,
    constraint name
        unique (name),
    constraint Enclosure_ibfk_1
        foreign key (enclosure_type_id) references Enclosure_Type (id)
            on update cascade on delete set null
);

create index enclosure_type_id
    on Enclosure (enclosure_type_id);

create table Enclosure_Image
(
    id           bigint auto_increment
        primary key,
    title        varchar(255) null,
    path         varchar(255) null,
    enclosure_id bigint       null,
    created_at   datetime     not null,
    updated_at   datetime     not null,
    constraint Enclosure_Image_ibfk_1
        foreign key (enclosure_id) references Enclosure (id)
            on update cascade on delete set null
);

create index enclosure_id
    on Enclosure_Image (enclosure_id);

create table Pass_Type
(
    id         bigint auto_increment
        primary key,
    name       varchar(255) not null,
    price      double       null,
    created_at datetime     not null,
    updated_at datetime     not null,
    constraint name
        unique (name)
);

create table Pass_Night_Availability
(
    id           bigint auto_increment
        primary key,
    date         datetime not null,
    pass_type_id bigint   null,
    created_at   datetime not null,
    updated_at   datetime not null,
    constraint Pass_Night_Availability_ibfk_1
        foreign key (pass_type_id) references Pass_Type (id)
            on update cascade on delete set null
);

create index pass_type_id
    on Pass_Night_Availability (pass_type_id);

create table Specie
(
    id          bigint auto_increment
        primary key,
    name        varchar(255) null,
    origin      varchar(255) null,
    description text         null,
    created_at  datetime     not null,
    updated_at  datetime     not null,
    constraint name
        unique (name)
);

create table Animal
(
    id           bigint auto_increment
        primary key,
    name         varchar(255) null,
    description  text         null,
    birthdate    datetime     null,
    image        varchar(255) null,
    specie_id    bigint       null,
    enclosure_id bigint       null,
    created_at   datetime     not null,
    updated_at   datetime     not null,
    constraint name
        unique (name),
    constraint Animal_ibfk_1
        foreign key (specie_id) references Specie (id)
            on update cascade on delete set null,
    constraint Animal_ibfk_2
        foreign key (enclosure_id) references Enclosure (id)
            on update cascade on delete set null
);

create index enclosure_id
    on Animal (enclosure_id);

create index specie_id
    on Animal (specie_id);

create table User_Role
(
    id         bigint auto_increment
        primary key,
    name       varchar(255) null,
    created_at datetime     not null,
    updated_at datetime     not null,
    constraint name
        unique (name)
);

create table User
(
    id           bigint auto_increment
        primary key,
    first_name   varchar(255) null,
    last_name    varchar(255) null,
    email        varchar(255) null,
    birthdate    datetime     null,
    password     varchar(255) null,
    user_role_id bigint       null,
    created_at   datetime     not null,
    updated_at   datetime     not null,
    deleted_at   datetime     null,
    constraint email
        unique (email),
    constraint User_ibfk_1
        foreign key (user_role_id) references User_Role (id)
            on update cascade on delete set null
);

create table Animal_Health_Book
(
    id          bigint auto_increment
        primary key,
    description text     null,
    date        datetime null,
    animal_id   bigint   null,
    user_id     bigint   null,
    created_at  datetime not null,
    updated_at  datetime not null,
    constraint Animal_Health_Book_ibfk_1
        foreign key (animal_id) references Animal (id)
            on update cascade on delete set null,
    constraint Animal_Health_Book_ibfk_2
        foreign key (user_id) references User (id)
            on update cascade on delete set null
);

create index animal_id
    on Animal_Health_Book (animal_id);

create index user_id
    on Animal_Health_Book (user_id);

create table Employee_Planning
(
    id          bigint auto_increment
        primary key,
    day_of_week varchar(255) null,
    start_time  datetime     null,
    end_time    datetime     null,
    user_id     bigint       null,
    created_at  datetime     not null,
    updated_at  datetime     not null,
    constraint Employee_Planning_ibfk_1
        foreign key (user_id) references User (id)
            on update cascade on delete set null
);

create index user_id
    on Employee_Planning (user_id);

create table Enclosure_Service_Book
(
    id           bigint auto_increment
        primary key,
    date         datetime null,
    description  text     null,
    enclosure_id bigint   null,
    user_id      bigint   null,
    created_at   datetime not null,
    updated_at   datetime not null,
    constraint date
        unique (date),
    constraint Enclosure_Service_Book_ibfk_1
        foreign key (enclosure_id) references Enclosure (id)
            on update cascade on delete set null,
    constraint Enclosure_Service_Book_ibfk_2
        foreign key (user_id) references User (id)
            on update cascade on delete set null
);

create index enclosure_id
    on Enclosure_Service_Book (enclosure_id);

create index user_id
    on Enclosure_Service_Book (user_id);

create table Pass
(
    id           bigint auto_increment
        primary key,
    valid_date   datetime not null,
    pass_type_id bigint   null,
    user_id      bigint   null,
    created_at   datetime not null,
    updated_at   datetime not null,
    constraint Pass_ibfk_1
        foreign key (pass_type_id) references Pass_Type (id)
            on update cascade on delete set null,
    constraint Pass_ibfk_2
        foreign key (user_id) references User (id)
            on update cascade on delete set null
);

create table Entry
(
    id           bigint auto_increment
        primary key,
    enclosure_id bigint   null,
    pass_id      bigint   null,
    created_at   datetime null,
    updated_at   datetime not null,
    constraint Entry_ibfk_1
        foreign key (enclosure_id) references Enclosure (id)
            on update cascade on delete set null,
    constraint Entry_ibfk_2
        foreign key (pass_id) references Pass (id)
            on update cascade on delete set null
);

create index enclosure_id
    on Entry (enclosure_id);

create index pass_id
    on Entry (pass_id);

create index pass_type_id
    on Pass (pass_type_id);

create index user_id
    on Pass (user_id);

create table Pass_Enclosure_Access
(
    id           bigint auto_increment
        primary key,
    `order`      int      null,
    enclosure_id bigint   null,
    pass_id      bigint   null,
    created_at   datetime not null,
    updated_at   datetime not null,
    constraint Pass_Enclosure_Access_ibfk_1
        foreign key (enclosure_id) references Enclosure (id)
            on update cascade on delete set null,
    constraint Pass_Enclosure_Access_ibfk_2
        foreign key (pass_id) references Pass (id)
            on update cascade on delete set null
);

create index enclosure_id
    on Pass_Enclosure_Access (enclosure_id);

create index pass_id
    on Pass_Enclosure_Access (pass_id);

create table Session
(
    id          bigint auto_increment
        primary key,
    token       varchar(255) null,
    expire_date datetime     not null,
    user_id     bigint       null,
    created_at  datetime     not null,
    updated_at  datetime     not null,
    constraint token
        unique (token),
    constraint Session_ibfk_1
        foreign key (user_id) references User (id)
            on update cascade on delete set null
);

create index user_id
    on Session (user_id);

create index user_role_id
    on User (user_role_id);