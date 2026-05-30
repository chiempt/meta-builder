package io.metabuilder.core.modules.core.repository;

import io.metabuilder.core.modules.core.entity.TaskTimebox;
import io.metabuilder.core.modules.core.entity.TaskTimeboxId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskTimeboxRepository extends JpaRepository<TaskTimebox, TaskTimeboxId> {
}
