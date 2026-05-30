-- ==============================================================================
-- 0. KHỞI TẠO CÁC KIỂU DỮ LIỆU TỰ ĐỊNH NGHĨA (ENUMS)
-- ==============================================================================
DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'task_status') THEN
            CREATE TYPE task_status AS ENUM ('TODO', 'IN_PROGRESS', 'REVIEW', 'DONE', 'CANCELED');
        END IF;

        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'task_priority') THEN
            CREATE TYPE task_priority AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');
        END IF;
    END
$$;


-- ==============================================================================
-- 2. PHÂN HỆ NGHIỆP VỤ CỐT LÕI (CORE BUSINESS DOMAINS)
-- ==============================================================================

-- 2.1. Khối Không gian làm việc: Bảng Không gian làm việc (Workspaces)
CREATE TABLE IF NOT EXISTS workspaces
(
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    description TEXT,
    owner_id    BIGINT       NOT NULL,
    is_deleted  BOOLEAN                  DEFAULT FALSE,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_workspaces_owner FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
);

-- 2.2. Khối Tri thức: Bảng Ghi chú (Notes)
CREATE TABLE IF NOT EXISTS notes
(
    id           BIGSERIAL PRIMARY KEY,
    workspace_id BIGINT       NOT NULL,
    creator_id   BIGINT       NOT NULL,
    title        VARCHAR(500) NOT NULL    DEFAULT '',
    content_json JSONB        NOT NULL    DEFAULT '{}'::jsonb,
    is_deleted   BOOLEAN                  DEFAULT FALSE,
    created_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_notes_workspace FOREIGN KEY (workspace_id) REFERENCES workspaces (id) ON DELETE CASCADE,
    CONSTRAINT fk_notes_creator FOREIGN KEY (creator_id) REFERENCES users (id) ON DELETE CASCADE
);

-- 2.3. Khối Hành động: Bảng Công việc (Tasks)
CREATE TABLE IF NOT EXISTS tasks
(
    id           BIGSERIAL PRIMARY KEY,
    workspace_id BIGINT       NOT NULL,
    title        VARCHAR(500) NOT NULL,
    description  TEXT,
    status       task_status              DEFAULT 'TODO',
    priority     task_priority            DEFAULT 'MEDIUM',
    creator_id   BIGINT       NOT NULL,
    assignee_id  BIGINT,
    due_date     TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    is_deleted   BOOLEAN                  DEFAULT FALSE,
    created_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_tasks_workspace FOREIGN KEY (workspace_id) REFERENCES workspaces (id) ON DELETE CASCADE,
    CONSTRAINT fk_tasks_creator FOREIGN KEY (creator_id) REFERENCES users (id) ON DELETE RESTRICT,
    CONSTRAINT fk_tasks_assignee FOREIGN KEY (assignee_id) REFERENCES users (id) ON DELETE SET NULL
);

-- 2.4. Khối Thời gian: Bảng Lịch trình / Sự kiện (Calendar Events)
CREATE TABLE IF NOT EXISTS calendar_events
(
    id           BIGSERIAL PRIMARY KEY,
    workspace_id BIGINT                   NOT NULL,
    creator_id   BIGINT                   NOT NULL,
    title        VARCHAR(500)             NOT NULL,
    start_time   TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time     TIMESTAMP WITH TIME ZONE NOT NULL,
    is_all_day   BOOLEAN                  DEFAULT FALSE,
    meeting_url  TEXT,
    location     VARCHAR(255),
    created_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_events_workspace FOREIGN KEY (workspace_id) REFERENCES workspaces (id) ON DELETE CASCADE,
    CONSTRAINT fk_event_creator FOREIGN KEY (creator_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT chk_event_time CHECK (end_time >= start_time)
);

-- ==============================================================================
-- 3. CÁC BẢNG LIÊN KẾT TRUNG GIAN (PIVOT TABLES)
-- ==============================================================================

-- Liên kết Note & Task
CREATE TABLE IF NOT EXISTS note_task_mappings
(
    id         BIGSERIAL PRIMARY KEY,
    note_id    BIGINT NOT NULL,
    task_id    BIGINT NOT NULL,
    block_id   VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_ntm_note FOREIGN KEY (note_id) REFERENCES notes (id) ON DELETE CASCADE,
    CONSTRAINT fk_ntm_task FOREIGN KEY (task_id) REFERENCES tasks (id) ON DELETE CASCADE,
    CONSTRAINT uq_note_task_block UNIQUE (note_id, task_id, block_id)
);

-- Liên kết Event & Note
CREATE TABLE IF NOT EXISTS event_note_mappings
(
    event_id   BIGINT NOT NULL,
    note_id    BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (event_id, note_id),
    CONSTRAINT fk_enm_event FOREIGN KEY (event_id) REFERENCES calendar_events (id) ON DELETE CASCADE,
    CONSTRAINT fk_enm_note FOREIGN KEY (note_id) REFERENCES notes (id) ON DELETE CASCADE
);

-- Liên kết Task & Event
CREATE TABLE IF NOT EXISTS task_timeboxes
(
    task_id    BIGINT NOT NULL,
    event_id   BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (task_id, event_id),
    CONSTRAINT fk_tt_task FOREIGN KEY (task_id) REFERENCES tasks (id) ON DELETE CASCADE,
    CONSTRAINT fk_tt_event FOREIGN KEY (event_id) REFERENCES calendar_events (id) ON DELETE CASCADE
);

-- ==============================================================================
-- 4. HỆ THỐNG CHỈ MỤC TỐI ƯU HÓA TRUY VẤN (INDEXES)
-- ==============================================================================


CREATE INDEX IF NOT EXISTS idx_workspaces_owner_active ON workspaces (owner_id) WHERE is_deleted = FALSE;
CREATE INDEX IF NOT EXISTS idx_notes_workspace_creator ON notes (workspace_id, creator_id) WHERE is_deleted = FALSE;
CREATE INDEX IF NOT EXISTS idx_tasks_workspace_status ON tasks (workspace_id, status) WHERE is_deleted = FALSE;
CREATE INDEX IF NOT EXISTS idx_events_workspace_time ON calendar_events (workspace_id, start_time, end_time);