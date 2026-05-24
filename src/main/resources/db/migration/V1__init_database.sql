CREATE TABLE users (
                       id BIGSERIAL primary key,
                       username VARCHAR(50) not null unique,
                       email varchar(255) not null unique,
                       password varchar(255),
                       created_at timestamp without time zone,
                       updated_at timestamp without time zone,
                       is_deleted boolean default false
);

create INDEX idx_users_is_deleted ON users(is_deleted) where is_deleted = false;
create INDEX idx_users_is_username ON users(username);