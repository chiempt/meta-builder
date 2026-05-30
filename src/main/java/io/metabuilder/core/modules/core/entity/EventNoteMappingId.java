package io.metabuilder.core.modules.core.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@EqualsAndHashCode
@Embeddable
public class EventNoteMappingId implements Serializable {
    private static final long serialVersionUID = 7491245870903755808L;
    @NotNull
    @Column(name = "event_id", nullable = false)
    private Long eventId;

    @NotNull
    @Column(name = "note_id", nullable = false)
    private Long noteId;


}