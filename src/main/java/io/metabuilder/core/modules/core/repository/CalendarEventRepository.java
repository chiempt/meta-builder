package io.metabuilder.core.modules.core.repository;

import io.metabuilder.core.modules.core.entity.CalendarEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CalendarEventRepository extends JpaRepository<CalendarEvent, Long> {
}
