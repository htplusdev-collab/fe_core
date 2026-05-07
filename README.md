# Enterprise Frontend Core

A production-ready, enterprise-grade frontend architecture built with **React + TypeScript** for large-scale CRUD, dashboard, and data-heavy applications.

## Tech Stack

| Category   | Technology               |
| ---------- | ------------------------ |
| Framework  | React 18                 |
| Language   | TypeScript (strict mode) |
| Build      | Vite + SWC               |
| Routing    | TanStack Router          |
| Data       | TanStack Query           |
| Tables     | TanStack Table           |
| Forms      | React Hook Form + Zod    |
| State      | Zustand                  |
| Styling    | TailwindCSS v4           |
| UI         | shadcn/ui + Radix        |
| Icons      | Lucide React             |
| HTTP       | Axios                    |
| Linting    | ESLint 9 (strict)        |
| Formatting | Prettier                 |
| Dead Code  | Knip                     |
| Git Hooks  | Husky + lint-staged      |

## Architecture

```
src/
├── app/                    # Application bootstrap (router, providers)
├── core/                   # Cross-cutting concerns
│   ├── auth/               # Authentication utilities
│   ├── config/             # Environment & HTTP client config
│   ├── constants/          # App-wide constants
│   ├── guards/             # Route guards (AuthGuard, RoleGuard)
│   ├── providers/          # React context providers
│   ├── stores/             # Zustand global stores
│   └── types/              # Core type definitions
├── domain/                 # Domain layer (framework-agnostic)
│   ├── base/               # AbstractEntity, TimestampedEntity
│   ├── contracts/          # IMapper, IRepository interfaces
│   └── value-objects/      # Pagination, Filter, QueryBuilder
├── infrastructure/         # Infrastructure layer
│   ├── api/                # BaseApiService, API response wrappers
│   ├── http/               # HttpClient, error classes
│   ├── query/              # Query key factories, generic hooks
│   ├── repository/         # BaseRepository
│   └── storage/            # Typed local storage
├── features/               # Feature modules (domain-driven)
│   ├── users/              # Example: Users feature
│   │   ├── api/            # UsersApiService
│   │   ├── application/    # UsersRepository
│   │   ├── domain/         # User entity + mapper
│   │   ├── forms/          # CreateUserForm
│   │   ├── hooks/          # useUsersQuery, mutations
│   │   ├── presentation/   # Pages + components
│   │   ├── table/          # Column definitions
│   │   ├── types/          # DTOs, interfaces
│   │   └── validation/     # Zod schemas
│   └── products/           # Example: Products feature
├── shared/                 # Shared reusable systems
│   ├── components/
│   │   ├── data-table/     # Generic DataTable system
│   │   ├── forms/          # Generic form fields
│   │   ├── layout/         # AppLayout, Sidebar, Header
│   │   └── ui/             # shadcn/ui primitives
│   ├── hooks/              # useDebounce, useDisclosure
│   ├── lib/                # Utility functions (cn, formatDate)
│   └── types/              # Shared utility types
├── routes/                 # Route definitions
│   └── pages/              # Lazy-loaded page components
├── styles/                 # Global CSS + Tailwind theme
└── assets/                 # Static assets
```

## Architecture Rules

```
features/ → shared/, core/, infrastructure/, domain/    ✅
shared/   → features/                                    ❌
core/     → features/                                    ❌
infrastructure/ → presentation/                          ❌
```

## Getting Started

```bash
npm install
npm run dev        # Start dev server on :3000
npm run build      # Type-check + production build
npm run lint       # ESLint (strict, zero warnings)
npm run typecheck  # TypeScript strict checks
npm run format     # Prettier formatting
npm run knip       # Dead code detection
```

## Key Patterns

### Adding a New Feature

1. Create folder under `src/features/<name>/`
2. Define types in `types/index.ts`
3. Create entity class extending `TimestampedEntity`
4. Create mapper extending `BaseMapper`
5. Create API service extending `BaseApiService`
6. Create repository extending `BaseRepository`
7. Add Zod validation schemas
8. Create query hooks using `createQueryKeys` + `usePaginatedQuery`
9. Build table columns using `DataTableColumnHeader`
10. Build forms using `GenericForm` + field components
11. Create presentation pages/components
12. Add route in `src/routes/`

### Generic DataTable

```tsx
const { table } = useDataTable({
    data,
    columns,
    manualPagination: true,
    manualSorting: true,
    pageCount: meta.totalPages,
});

<DataTable table={table} columns={columns} isLoading={isLoading} />;
```

### Generic Form

```tsx
<GenericForm schema={createUserSchema} onSubmit={handleSubmit}>
    {() => (
        <>
            <TextField name="email" label="Email" required />
            <SelectField name="role" label="Role" options={roleOptions} />
        </>
    )}
</GenericForm>
```

### Query Key Factory

```ts
const userKeys = createQueryKeys('users');
// userKeys.all        → ['users']
// userKeys.list(p)    → ['users', 'list', params]
// userKeys.detail(id) → ['users', 'detail', id]
```

## Performance

- **Code splitting**: Routes are lazy-loaded via `lazyRouteComponent`
- **Vendor chunking**: React, TanStack, forms, and UI libs split into separate chunks
- **Query caching**: TanStack Query with stale-while-revalidate
- **Memoization**: `useMemo`/`useCallback` for expensive computations and stable references
- **Placeholder data**: Previous query data shown during pagination transitions

## License

Private — All rights reserved.
