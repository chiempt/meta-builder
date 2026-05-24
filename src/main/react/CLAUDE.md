# Claude Instructions

This file contains Claude-specific configuration, prompts, and workflow instructions.

## Configuration

- **Model**: `claude-4-5-sonnet-20250929`
- **Instructions**: Found in `src/main/react/INSTRUCTIONS.md`
- **System Prompt**: "You are a senior principal software engineer with deep expertise in Java, React, and financial trading systems."

## Key Workflows

### 1. Code Generation

When generating React code:
- **Never use HTML components**
- **Always use UI Kit components**
- Examples:
  - Input: `import { Input } from "@kit-oasis/react-components-react"
  - Buttons: `import { PrimaryButton, SecondaryButton } from "@kit-oasis/react-components-react"`
  - Typography: `import { Title, Text } from "@kit-oasis/react-components-react"`

### 2. File Structure

- React component files: `Component.tsx`
- Page files: `PageName.tsx`
- Shared components: `src/shared/components/`
- Utilities: `src/shared/utils/`
- Types: `src/shared/types/`

## Troubleshooting

### Common Issues

#### Duplicate Component Registrations

If you encounter duplicate component registrations, it's likely due to:

**Cause**: React components being registered both as page components and as shared components, OR multiple registrations in different files.

**Solution**:
1. **Check registration files**:
   - `src/main/react/Registration.tsx` - Page registrations
   - `src/shared/Registration.tsx` - Shared component registrations
   - Other registration files under `src/shared/`

2. **Follow the correct pattern**:
   - **Pages**: Register components in `src/main/react/Registration.tsx` (or specific `PageRegistration.tsx` files)
   - **Shared Components**: Register in `src/shared/Registration.tsx` or `src/shared/components/Registration.tsx`

3. **Avoid manual HTML registration**:
   - DO NOT use `<title>...</title>` or `<section>...</section>` tags directly in component code
   - DO NOT register components in `src/shared/Registration.tsx` if they are also pages

**Example of incorrect registration**:

```tsx
// src/shared/Registration.tsx - INCORRECT for pages
export default function Registration() {
  return (
    <>
      <title>My Page</title>
      <section data-page-path="/my-page">
        {/* Page content */}
      </section>
    </>
  );
}
```

**Example of correct registration**:

```tsx
// src/main/react/Registration.tsx - CORRECT for pages
export default function Registration() {
  return (
    <>
      <title>My Page</title>
      <section data-page-path="/my-page">
        {/* Page content */}
      </section>
    </>
  );
}

// src/shared/Registration.tsx - CORRECT for shared components
export default function SharedRegistration() {
  return (
    <>
      <meta name="meta-builder-component" content="MySharedComponent" />
      <MySharedComponent />
    </>
  );
}
```

**Refactoring strategy**:
1. Identify the correct registration file based on component type:
   - Pages → `src/main/react/Registration.tsx` or specific `PageRegistration.tsx` files
   - Shared components → `src/shared/Registration.tsx` or `src/shared/components/Registration.tsx`

2. Move the component registration to the correct file

3. Remove the incorrect registration

4. Update any imports or references if needed

5. Validate that the component is correctly registered and accessible

#### CSS Modules with Custom Global Config

If you encounter issues with CSS modules where custom global config isn't working:

**Cause**: CSS module config in `src/main/react/vite.config.ts` might be incorrect or missing custom config.

**Solution**:
1. Verify `css.modules` configuration in `vite.config.ts`

2. Ensure custom global config is defined and applied

3. Check for naming conflicts or incorrect path mappings

## Important Notes

- All code must be written in TypeScript
- Keep components small and focused (single responsibility principle)
- Prefer functional components with hooks
- Use Tailwind CSS for styling (compatible with Kit-Oasis UI framework)
- Avoid duplicate registrations and naming conflicts

## File Structure Reference

```
src/main/react/
├── Registration.tsx                # Page registrations
├── vite.config.ts                  # Vite configuration
└── api/
    ├── FetchAPI.ts                 # API fetch wrapper
    ├── ProductApi.ts               # Product API endpoints
    ├── CategoryApi.ts              # Category API endpoints
    └── UserApi.ts                  # User API endpoints

src/shared/
├── Registration.tsx                # Shared component registrations
├── types/
│   ├── Category.ts
│   ├── Product.ts
│   └── Pagination.ts
├── utils/
│   └── formatter.ts
└── components/
    └── Registration.tsx            # Additional shared component registrations
```

## Workflow for Adding New Components

1. Create the component file in the appropriate location:
   - Page: `src/main/react/pages/ComponentName.tsx`
   - Shared: `src/shared/components/ComponentName.tsx`

2. Create a separate `Registration.tsx` for the component if it's a page:
   - `src/main/react/PageRegistration.tsx`

3. Register the component in the appropriate `Registration.tsx` file:
   - For pages: `src/main/react/Registration.tsx` (or specific page registration)
   - For shared components: `src/shared/Registration.tsx` or `src/shared/components/Registration.tsx`

4. Use Kit-Oasis UI components instead of HTML elements

5. Ensure proper TypeScript types are defined

6. Test the component and verify it renders correctly

## Workflow for Adding New Pages

1. Create the page component file: `src/main/react/pages/PageName.tsx`

2. Create a page registration file: `src/main/react/PageNameRegistration.tsx`

3. In `PageNameRegistration.tsx`, use:
```tsx
import { PageContainer, PageTitle } from "@kit-oasis/react-components-react";
import PageName from "./PageName";

export default function PageNameRegistration() {
  return (
    <>
      <title>Page Name</title>
      <PageContainer>
        <PageTitle>Page Name</PageTitle>
        <PageName />
      </PageContainer>
    </>
  );
}
```

4. In `src/main/react/Registration.tsx`, import and export:
```tsx
export { default as PageNameRegistration } from "./PageNameRegistration";
```

5. Ensure the page is correctly exported from `src/main/react/index.tsx`
