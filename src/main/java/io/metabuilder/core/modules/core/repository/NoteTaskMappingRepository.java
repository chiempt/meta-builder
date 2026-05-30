package io.metabuilder.core.modules.core.repository;

import io.metabuilder.core.modules.core.entity.NoteTaskMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteTaskMappingRepository extends JpaRepository<NoteTaskMapping, Long> {
}
