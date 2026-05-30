package io.metabuilder.core.modules.core.repository;

import io.metabuilder.core.modules.core.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {
}
