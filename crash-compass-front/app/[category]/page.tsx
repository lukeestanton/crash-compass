import GenericCategoryPage from "../components/GenericCategoryPage";
import { getAllCategories } from "../data/chartDefinitions";
import { notFound } from "next/navigation";

interface CategoryPageProps {
    params: Promise<{
        category: string;
    }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params;
    const validCategories = getAllCategories();
    
    if (!validCategories.includes(category)) {
        notFound();
    }

    return <GenericCategoryPage category={category} />;
}

export function generateStaticParams() {
    const categories = getAllCategories();
    return categories.map((category) => ({
        category: category,
    }));
} 