package io.metabuilder.core.modules.users.repository;

import io.metabuilder.core.modules.users.entity.User;
import io.metabuilder.core.modules.users.entity.UserProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProviderRepository extends JpaRepository<UserProvider, Long> {
    UserProvider getReferenceByUser(User user);
}
