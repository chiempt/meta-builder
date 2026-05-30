package io.metabuilder.core.modules.core.entity;

import io.metabuilder.core.modules.users.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.OffsetDateTime;

@Getter
@Setter
@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "workspace_id", nullable = false)
    private Workspace workspace;

    @Size(max = 500)
    @NotNull
    @Column(name = "title", nullable = false, length = 500)
    private String title;

    @Column(name = "description", length = Integer.MAX_VALUE)
    private String description;

    @Enumerated(EnumType.STRING)
    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.NAMED_ENUM)
    @ColumnDefault("'TODO'")
    @Column(name = "status", columnDefinition = "task_status")
    private io.metabuilder.core.modules.users.enums.TaskStatus status;

    @Enumerated(EnumType.STRING)
    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.NAMED_ENUM)
    @ColumnDefault("'MEDIUM'")
    @Column(name = "priority", columnDefinition = "task_priority")
    private io.metabuilder.core.modules.users.enums.TaskPriority priority;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "assignee_id")
    private User assignee;

    @Column(name = "due_date")
    private OffsetDateTime dueDate;

    @Column(name = "completed_at")
    private OffsetDateTime completedAt;

    @ColumnDefault("false")
    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "created_at")
    private OffsetDateTime createdAt;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;


}