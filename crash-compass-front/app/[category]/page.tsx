import GenericCategoryPage from "../components/GenericCategoryPage";
import { getAllCategories } from "../data/chartDefinitions";
import { notFound } from "next/navigation";

interface CategoryPageProps {
    params: {
        category: string;
    };
}

export default function CategoryPage({ params }: CategoryPageProps) {
    const { category } = params;
    const validCategories = getAllCategories();
    
    // Validate that the category exists
    if (!validCategories.includes(category)) {
        notFound();
    }

    return <GenericCategoryPage category={category} />;
}

// Generate static params for all valid categories
export function generateStaticParams() {
    const categories = getAllCategories();
    return categories.map((category) => ({
        category: category,
    }));
} 