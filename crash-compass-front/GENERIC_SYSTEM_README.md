# Generic Category System

This document explains how to use the new generic category system for economic data pages.

## Overview

The generic system allows you to create category pages dynamically using a single component and centralized chart definitions. This eliminates code duplication and makes it easy to add new categories and charts.

## Files Structure

- `app/data/chartDefinitions.ts` - Centralized chart definitions with categories
- `app/components/GenericCategoryPage.tsx` - Generic component for any category
- `app/[category]/page.tsx` - Dynamic route that uses the generic component
- `app/categories/page.tsx` - Page listing all available categories

## How to Add a New Chart

1. **Add the chart definition** in `app/data/chartDefinitions.ts`:

```typescript
{
    title: "Your Chart Title",
    blurb: "Description of what this chart measures and why it's important.",
    category: "your-category", // Use existing category or create new one
    chartProps: {
        chartName: "yourchartname", // Must match backend API
        title: "Chart Display Title",
        range: { months: 36 }, // or { years: 10 }
        yDomain: ["auto", "auto"],
        yTickFormatter: (t: number) => `${t}%`, // Customize formatting
        tooltipLabelFormatter: (l: string) => `Month: ${l}`,
        tooltipValueFormatter: (v: number) => [`${v}%`, "Your Unit"],
    },
    featured: true, // Optional: mark as featured
}
```

2. **Add the category display name** (if it's a new category):

```typescript
export const categoryDisplayNames: Record<string, string> = {
    // ... existing categories
    "your-category": "Your Category Display Name",
};
```

3. **Add the backend API endpoint** (if needed) in the C# backend.

## How to Add a New Category

1. Add charts with the new category name in `chartDefinitions.ts`
2. Add the category display name in `categoryDisplayNames`
3. The dynamic route will automatically work for the new category

## URL Structure

- `/consumers` - Consumer data page
- `/labor` - Labor market data page  
- `/production` - Production data page
- `/financial` - Financial conditions page
- `/housing` - Housing data page (new example)
- `/categories` - Overview of all categories

## Benefits

1. **DRY Principle**: No code duplication between category pages
2. **Easy Maintenance**: All chart definitions in one place
3. **Consistent UI**: All category pages have the same layout and functionality
4. **Easy Extension**: Adding new categories requires minimal code changes
5. **Type Safety**: TypeScript interfaces ensure consistency

## Migration from Old Pages

The old individual category pages (`consumers/page.tsx`, `labor-market/page.tsx`, etc.) are still available for reference. You can gradually migrate to the new system by:

1. Ensuring all charts are defined in `chartDefinitions.ts`
2. Testing the new dynamic routes work correctly
3. Updating navigation links to use the new URLs
4. Eventually removing the old pages

## Example Usage

```typescript
// The dynamic route automatically handles this:
// /consumers -> GenericCategoryPage with category="consumers"
// /labor -> GenericCategoryPage with category="labor"
// etc.

// You can also use the helper functions:
import { getChartsByCategory, getAllCategories } from "../data/chartDefinitions";

const consumerCharts = getChartsByCategory("consumers");
const allCategories = getAllCategories();
``` 