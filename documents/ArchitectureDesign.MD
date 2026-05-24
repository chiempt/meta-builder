# Annotation Design Specification

## Overview

Tài liệu này mô tả bộ annotation dành cho nền tảng:

* Code-first application builder
* Metadata-driven runtime framework
* Dynamic admin/internal tools platform

Mục tiêu của annotation system:

* Developer chỉ cần khai báo Java entities
* Framework tự generate:

    * CRUD APIs
    * Validation
    * Form schema
    * Table schema
    * Filter/search
    * Permissions
    * Workflow metadata
    * Frontend rendering schema

Annotation KHÔNG dùng trực tiếp để execute logic runtime.

Annotation chỉ là:

```text
Developer DSL
    ↓
Metadata extraction
    ↓
Internal metadata model
    ↓
Runtime execution engine
```

---

# Design Principles

## 1. Code-first

Framework ưu tiên:

* Java entity definitions
* Strong typing
* IDE support
* Compile-time safety

Runtime metadata là generated artifact.

---

## 2. Separation of Concerns

Annotations được chia theo responsibility rõ ràng:

| Category | Responsibility         |
| -------- | ---------------------- |
| Entity   | Resource definition    |
| UI       | Rendering metadata     |
| Query    | Search/filter/sort     |
| Security | Access control         |
| Workflow | State transitions      |
| Actions  | Runtime actions        |
| Audit    | History tracking       |
| Realtime | WebSocket/live updates |

---

## 3. Metadata-Driven Runtime

Annotations KHÔNG được sử dụng trực tiếp bởi controllers/services.

Framework phải convert annotations thành:

```text
Metadata Graph
```

Ví dụ:

```text
Annotations
   ↓
Metadata Extractor
   ↓
EntityMeta
FieldMeta
ActionMeta
WorkflowMeta
   ↓
Runtime Registry
```

---

# Annotation Categories

# 1. Entity-Level Annotations

Dùng để mô tả application resource.

Ví dụ:

* entity identity
* CRUD capability
* page generation
* audit behavior
* workflow support

## Annotations

| Annotation       | Purpose                       |
| ---------------- | ----------------------------- |
| @AppEntity       | Định nghĩa application entity |
| @Page            | Generate application page     |
| @TableView       | Generate table/grid view      |
| @Crud            | Enable CRUD operations        |
| @Auditable       | Enable audit tracking         |
| @SoftDelete      | Soft delete support           |
| @WorkflowEnabled | Enable workflow engine        |
| @TenantScoped    | Multi-tenant isolation        |
| @Realtime        | Enable realtime updates       |

---

# 2. Field-Level Annotations

Dùng để mô tả field metadata.

Ví dụ:

* rendering
* validation
* visibility
* form behavior
* display config

## Annotations

| Annotation        | Purpose               |
| ----------------- | --------------------- |
| @UIField          | Base UI metadata      |
| @FormField        | Form rendering        |
| @TableColumn      | Table/grid rendering  |
| @DetailField      | Detail page rendering |
| @ReadonlyField    | Readonly behavior     |
| @HiddenField      | Hide field            |
| @DefaultValue     | Default values        |
| @FieldDescription | UI help text          |

---

# 3. Query/Search Annotations

Dùng để generate:

* filters
* sorting
* search metadata
* query schema

## Annotations

| Annotation   | Purpose               |
| ------------ | --------------------- |
| @Searchable  | Global search support |
| @Sortable    | Sorting support       |
| @Filter      | Filter support        |
| @QuickFilter | Quick filter UI       |
| @RangeFilter | Numeric/date ranges   |
| @EnumFilter  | Enum select filter    |

---

# 4. Validation Annotations

Validation layer dùng:

* Jakarta Validation
* Custom metadata validation

## Standard Validation

| Annotation |
| ---------- |
| @NotNull   |
| @NotBlank  |
| @Size      |
| @Email     |
| @Pattern   |

## Custom Validation

| Annotation      | Purpose                |
| --------------- | ---------------------- |
| @Unique         | Unique constraint      |
| @Immutable      | Immutable after create |
| @SlugField      | Slug generation        |
| @FieldValidator | Custom validator       |

---

# 5. Relationship Annotations

Dùng để mô tả runtime relationships.

## Annotations

| Annotation      | Purpose             |
| --------------- | ------------------- |
| @Relation       | Entity relationship |
| @Lookup         | Lookup selector     |
| @ReferenceField | Reference rendering |
| @TreeRelation   | Tree hierarchy      |

---

# 6. UI Behavior Annotations

Dùng để mô tả advanced rendering behavior.

## Annotations

| Annotation        | Purpose                |
| ----------------- | ---------------------- |
| @Section          | Form section           |
| @Tab              | Tab grouping           |
| @ConditionalField | Conditional visibility |
| @VisibleWhen      | Dynamic visibility     |
| @DisableWhen      | Dynamic disable        |
| @DynamicOptions   | Runtime select options |
| @AsyncOptions     | Async option loading   |

---

# 7. Table/Grid Annotations

Dùng để generate enterprise table metadata.

## Annotations

| Annotation        | Purpose             |
| ----------------- | ------------------- |
| @PinnedColumn     | Sticky column       |
| @ExportableColumn | Export support      |
| @BadgeColumn      | Badge rendering     |
| @CurrencyColumn   | Currency formatting |
| @StatusColumn     | Status UI           |
| @ActionColumn     | Action rendering    |

---

# 8. Security Annotations

Dùng cho:

* RBAC
* field-level security
* data isolation

## Annotations

| Annotation       | Purpose              |
| ---------------- | -------------------- |
| @AllowRoles      | Allowed roles        |
| @DenyRoles       | Denied roles         |
| @FieldPermission | Field access control |
| @OwnerOnly       | Owner restriction    |
| @DataScope       | Data scoping         |
| @EncryptedField  | Encrypted storage    |

---

# 9. Workflow Annotations

Dùng để integrate workflow/state machine engine.

## Annotations

| Annotation      | Purpose                |
| --------------- | ---------------------- |
| @StateField     | Workflow state field   |
| @Transition     | State transition       |
| @InitialState   | Initial workflow state |
| @FinalState     | Final workflow state   |
| @WorkflowAction | Workflow action        |

---

# 10. Runtime Action Annotations

Dùng để define custom entity actions.

## Annotations

| Annotation     | Purpose             |
| -------------- | ------------------- |
| @EntityAction  | Entity action       |
| @BulkAction    | Bulk table action   |
| @RowAction     | Table row action    |
| @AsyncAction   | Async processing    |
| @ConfirmAction | Confirmation dialog |

---

# 11. Event Annotations

Dùng cho event-driven architecture.

## Annotations

| Annotation | Purpose              |
| ---------- | -------------------- |
| @OnCreate  | Create hooks         |
| @OnUpdate  | Update hooks         |
| @OnDelete  | Delete hooks         |
| @EmitEvent | Publish domain event |

---

# 12. Audit Annotations

Dùng cho history tracking.

## Annotations

| Annotation    | Purpose             |
| ------------- | ------------------- |
| @AuditField   | Track field changes |
| @AuditIgnore  | Ignore field        |
| @TrackHistory | Enable history      |
| @TrackChanges | Change tracking     |

---

# 13. API/OpenAPI Annotations

Dùng để customize generated APIs.

## Annotations

| Annotation | Purpose       |
| ---------- | ------------- |
| @ApiField  | API metadata  |
| @ApiHidden | Hide from API |
| @ApiFilter | API filtering |
| @ApiSort   | API sorting   |

---

# 14. Realtime Annotations

Dùng cho WebSocket/live update.

## Annotations

| Annotation        | Purpose           |
| ----------------- | ----------------- |
| @BroadcastChanges | Push updates      |
| @LiveUpdates      | Realtime sync     |
| @RealtimeChannel  | WebSocket channel |

---

# 15. Multi-Tenant Annotations

Dùng cho tenant isolation.

## Annotations

| Annotation      | Purpose             |
| --------------- | ------------------- |
| @TenantField    | Tenant identifier   |
| @TenantIsolated | Tenant isolation    |
| @SharedResource | Shared cross-tenant |

---

# 16. Plugin/Extension Annotations

Dùng cho plugin architecture.

## Annotations

| Annotation       | Purpose                   |
| ---------------- | ------------------------- |
| @ExtensionPoint  | Extension hook            |
| @PluginHook      | Plugin execution          |
| @CustomRenderer  | Custom frontend renderer  |
| @CustomProcessor | Custom metadata processor |

---

# Architecture Flow

```text
Java Entity
   ↓
Annotation Scanner
   ↓
Metadata Builder
   ↓
Metadata Registry
   ↓
Schema Generator
   ↓
Runtime Engines
```

---

# Runtime Engines

Framework sẽ có các engine:

| Engine            | Responsibility           |
| ----------------- | ------------------------ |
| CRUD Engine       | Dynamic CRUD APIs        |
| Query Engine      | Dynamic filtering/search |
| UI Engine         | Form/table schema        |
| Workflow Engine   | State machine            |
| Permission Engine | RBAC/ABAC                |
| Event Engine      | Domain events            |
| Audit Engine      | History tracking         |

---

# Important Rules

## 1. Annotation != Runtime Logic

Annotation chỉ dùng để:

```text
Describe metadata
```

Không execute business logic trực tiếp.

---

## 2. Avoid Frontend Coupling

BAD:

```java
@Field(
   reactComponent = "MuiTextField"
)
```

GOOD:

```java
@ComponentType("text")
```

Frontend sẽ map component runtime.

---

## 3. Avoid Massive Reflection Runtime

Reflection chỉ dùng lúc startup:

```text
Startup
   ↓
Scan annotations
   ↓
Build metadata registry
   ↓
Cache metadata
```

Runtime dùng cached metadata.

---

## 4. Modular Design

Annotations phải:

* composable
* extensible
* plugin-friendly

KHÔNG tạo:

* god annotations
* massive configs
* frontend lock-in

---

# Recommended MVP Scope

## Build First

* @AppEntity
* @Page
* @Crud
* @UIField
* @FormField
* @TableColumn
* @Searchable
* @Sortable
* @Filter
* @EntityAction
* @AllowRoles
* @Auditable

---

# Do NOT Build Early

Tránh build quá sớm:

* drag-drop UI builder
* runtime schema editor
* BPMN workflow
* scripting engine
* dynamic code compilation
* microservices
* visual designer

---

# Long-Term Evolution

```text
Phase 1
Code-first CRUD framework

    ↓

Phase 2
Metadata-driven admin platform

    ↓

Phase 3
Runtime configurable platform

    ↓

Phase 4
Low-code/internal tools ecosystem
```
