CREATE TABLE users
(
    id         BIGSERIAL primary key,
    username   VARCHAR(50)  not null unique,
    email      varchar(255) not null unique,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_deleted boolean                  default false
);

create INDEX idx_users_is_deleted ON users (is_deleted) where is_deleted = false;
create INDEX idx_users_is_username ON users (username);


CREATE TABLE user_profiles
(
    id           BIGSERIAL PRIMARY KEY,
    full_name    VARCHAR(100) not null,
    phone_number varchar(20) UNIQUE,
    avatar_url   TEXT,
    timezone     VARCHAR(50)              DEFAULT 'UTC',
    language     VARCHAR(10)              DEFAULT 'vi',
    bio          TEXT,
    created_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    user_id             BIGINT        NOT NULL,

    CONSTRAINT fk_profile_user foreign key (user_id) references users (id) on delete CASCADE
);

CREATE TYPE provider_type AS ENUM ('GOOGLE', 'SLACK', 'LARK', 'GITHUB', 'LOCAL');

CREATE TABLE user_providers
(
    id                  BIGSERIAL PRIMARY KEY,
    user_id             BIGINT        NOT NULL,
    provider            provider_type NOT NULL,
    provider_account_id VARCHAR(255)  NOT NULL,
    password   varchar(255),
    access_token        TEXT,
    refresh_token       TEXT,
    token_expires_at    TIMESTAMP WITH TIME ZONE,
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_provider_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,

    CONSTRAINT uq_user_provider UNIQUE (user_id, provider),

    CONSTRAINT uq_provider_account UNIQUE (provider, provider_account_id)
);

CREATE INDEX idx_user_providers_lookup ON user_providers (provider, provider_account_id);