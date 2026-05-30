package io.metabuilder.core.modules.users.entity;

import io.metabuilder.core.shared.annotations.Page;
import io.metabuilder.core.shared.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import lombok.Data;

@Table(name = "users")
@Data
@Page(
        path = "users", name = "users",
        title = "Danh sách user"
)
public class UsersEntity extends BaseEntity {

    @Column(name = "username")
    private String username;

    @Column(name = "fullName")
    private String fullName;

    @Column(name = "avatar_url")
    private String avatarUrl;

}
