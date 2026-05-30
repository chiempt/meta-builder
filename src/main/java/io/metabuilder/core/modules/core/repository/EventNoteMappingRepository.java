package io.metabuilder.core.modules.core.repository;

import io.metabuilder.core.modules.core.entity.EventNoteMapping;
import io.metabuilder.core.modules.core.entity.EventNoteMappingId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventNoteMappingRepository extends JpaRepository<EventNoteMapping, EventNoteMappingId> {
}
