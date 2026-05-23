com.yourapp
├── core/
│   ├── metadata/          # Entity definitions, field types, schema management
│   ├── engine/            # CRUD generation, query building
│   ├── workflow/          # State machine, transitions
│   ├── permission/        # RBAC, row-level, field-level security
│   └── schema/            # Form/table schema generation
├── platform/
│   ├── tenant/            # Multi-tenant isolation
│   ├── audit/             # Change history, diff tracking
│   ├── events/            # Domain event bus
│   ├── cache/             # Redis caching strategy
│   └── plugin/            # Extension points
├── api/
│   ├── dynamic/           # Runtime-generated controllers
│   ├── admin/             # Metadata management APIs
│   └── websocket/         # Real-time updates
├── infra/
│   ├── security/          # Spring Security config
│   ├── persistence/       # JPA configs, repositories
│   └── config/            # App config, Redis, etc.
└── shared/
├── dto/               # Common DTOs, pagination
├── exception/         # Global error handling
└── util/              # Helpers, converters