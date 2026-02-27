---
name: hiu-fe
description: Master skill for the Hiu platform frontend. Use when creating UI components, pages, modules, adding API calls, managing Redux state, or understanding the Next.js + Redux + Tailwind architecture. Covers module structure, RTK Query patterns, custom fetcher, and Tailwind color system.
compatibility: Designed for Claude Code. Requires Node.js, pnpm.
metadata:
  author: hiu-team
  version: "1.0"
---

# Hiu Frontend Skill

## Project Overview

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **State**: Redux Toolkit + RTK Query
- **Styling**: Tailwind CSS v3 with custom design system
- **Root**: `d:/Code/hiu/fe/`
- **Package manager**: pnpm (also has npm lock file)

## Directory Structure

```
src/
├── app/                     # Next.js App Router
│   ├── layout.tsx           # Root layout with StoreProvider
│   ├── page.tsx             # Home page (Server Component)
│   └── api/                 # Next.js API routes (internal proxy)
├── modules/                 # Feature modules (main UI pages)
│   └── ExampleClientComponent/
│       ├── page.tsx         # Client component entry ('use client')
│       └── components/      # Sub-components for this module
├── common/
│   ├── components/          # Shared UI components (Button.tsx, etc.)
│   ├── types/               # Shared TypeScript types
│   └── utils/
│       └── fetcher.ts       # HTTP utility for Server Components
└── lib/
    ├── Provider/
    │   └── StoreProvider.tsx
    ├── store.ts              # Redux store config
    ├── features/
    │   └── counterSlice.ts  # Redux slices
    └── services/
        ├── api.ts            # RTK Query API (base)
        └── types/           # API response types
```

## Creating a New Module (Page)

Each module is a self-contained directory under `src/modules/`.

```
src/modules/MyFeature/
├── page.tsx          # Main component (add 'use client' if needed)
└── components/       # Sub-components specific to this module
    └── MyWidget.tsx
```

### Module page.tsx template

```tsx
'use client';

import React from 'react';

const MyFeaturePage = () => {
  return (
    <main className="flex min-h-screen flex-col p-8">
      {/* content */}
    </main>
  );
};

export default MyFeaturePage;
```

Then import and use it in `src/app/page.tsx` (Server Component):

```tsx
import MyFeaturePage from '@/modules/MyFeature/page';

export default async function Home() {
  return <MyFeaturePage />;
}
```

## Data Fetching Patterns

### Pattern 1: RTK Query (Client Components — preferred)

Add an endpoint to `src/lib/services/api.ts`:

```ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const exampleApi = createApi({
  reducerPath: 'exampleApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_URL}/api` }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users',
    }),
    createUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({ url: 'users', method: 'POST', body }),
    }),
  }),
});

export const { useGetUsersQuery, useCreateUserMutation } = exampleApi;
```

Register the reducer in `src/lib/store.ts`:

```ts
reducer: {
  [exampleApi.reducerPath]: exampleApi.reducer,
}
middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(exampleApi.middleware),
```

Use in Client Component:

```tsx
'use client';
const { data, isLoading, isError } = useGetUsersQuery();
```

### Pattern 2: fetcher utility (Server Components)

```ts
import fetcher from '@/common/utils/fetcher';

// Call internal Next.js API route
const data = await fetcher<ResponseType, RequestType>({
  path: '/endpoint',
  method: 'POST',
  data: requestBody,
});

// Call external API directly (isExternal: true)
const data = await fetcher<ResponseType>({
  path: '/endpoint',
  isExternal: true,
});
```

`fetcher` uses `NEXT_PUBLIC_URL` for internal, `NEXT_PUBLIC_API_URL` for external.

## Redux State (Slices)

Create a slice in `src/lib/features/mySlice.ts`:

```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MyState { value: string }
const initialState: MyState = { value: '' };

const mySlice = createSlice({
  name: 'my',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = mySlice.actions;
export default mySlice.reducer;
```

Register in `src/lib/store.ts`:

```ts
import myReducer from './features/mySlice';
reducer: { my: myReducer }
```

Export types for `useSelector`:

```ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## Tailwind CSS & Design System

Custom colors are in `tailwind.config.ts` under `colors.default.*`.

```
Primary:   #3498db   → text-default-primary, bg-default-primary
Secondary: #6c757d   → text-default-secondary
Success:   #28a745   → text-default-success
Warning:   #ffc107   → text-default-warning
Error:     #dc3545   → text-default-error
Info:      #17a2b8   → text-default-info
Neutral:   #6c757d   → text-default-neutral
```

Shades go from 5 to 100 (e.g. `bg-default-primary-10`, `text-default-error-60`).

### Shared Component pattern

```tsx
// src/common/components/Button.tsx
import { cn } from '@/common/utils/cn'; // or use clsx + twMerge

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button = ({ variant = 'primary', className, ...props }: ButtonProps) => (
  <button
    className={cn(
      'px-4 py-2 rounded-lg font-medium transition-colors',
      variant === 'primary' && 'bg-default-primary text-white hover:bg-default-primary-60',
      variant === 'secondary' && 'bg-default-secondary-10 text-default-secondary',
      className
    )}
    {...props}
  />
);
```

The project already has `clsx` and `tailwind-merge` installed. Use both for class merging.

## Environment Variables

```
NEXT_PUBLIC_API_URL   # External API base URL (hiu-api Cloudflare Worker)
NEXT_PUBLIC_URL       # This Next.js app's URL (for internal API routes)
```

## Key Conventions

- **'use client'** at the top of any component using hooks, useState, useEffect, Redux hooks, or RTK Query hooks.
- **Server Components** (no directive) for data fetching with `fetcher`, pass data as props down.
- Module `page.tsx` is the entry point; keep it lean; delegate to `components/` sub-files.
- Path alias `@/` maps to `src/`.
- Prefer RTK Query over raw `fetch` in client components for caching + loading states.
- Use `cn()` (clsx + twMerge) for conditional class merging.

## Common Tasks

- **Add a new page**: Create `src/modules/NewPage/page.tsx`, import in `src/app/page.tsx` or create `src/app/new-route/page.tsx`.
- **Add API endpoint**: Add to `src/lib/services/api.ts` endpoints, export the hook.
- **Add global state**: Create slice in `src/lib/features/`, register in store.
- **Shared component**: Add to `src/common/components/`.
