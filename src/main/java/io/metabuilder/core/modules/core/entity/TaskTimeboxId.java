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
public class TaskTimeboxId implements Serializable {
    private static final long serialVersionUID = 5221363743972917588L;
    @NotNull
    @Column(name = "task_id", nullable = false)
    private Long taskId;

    @NotNull
    @Column(name = "event_id", nullable = false)
    private Long eventId;


}