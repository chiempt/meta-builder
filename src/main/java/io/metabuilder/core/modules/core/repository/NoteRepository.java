package io.metabuilder.core.modules.core.repository;

import io.metabuilder.core.modules.core.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

interface NoteRepository extends JpaRepository<Note, Long> {
}
