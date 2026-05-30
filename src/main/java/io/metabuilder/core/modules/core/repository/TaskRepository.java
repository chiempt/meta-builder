package io.metabuilder.core.modules.core.repository;

import io.metabuilder.core.modules.core.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

interface TaskRepository extends JpaRepository<Task, Long> {
}
