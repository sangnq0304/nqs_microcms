import { useEffect } from "react";
import { RepositoryFactory } from "@/repositories/repository-factory";
import { useToast } from "@/contexts/toastMessage";
import { buildCategoryTree } from "@/utils/category";

import { MESSAGE } from "@/constant/messages";

// import Post from "@/components/Post"


export default function Home({ categories, errorMessage }) {
    const { showToast } = useToast();

    useEffect(() => {
        if (errorMessage) {
            showToast(errorMessage, "error");
        }
    })

    return (
        <div className="home-page">
            Trang chủ
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const listCategory = RepositoryFactory.get("categories");
        const response = await listCategory.getCategories();
        const data = response?.data?.contents;
        const categories = buildCategoryTree(data);

        return {
            props: {
                categories
            }
        }
    } catch (e) {
        console.log('error:', e)
        const errorMessage = MESSAGE.UNKNOWN_ERROR;

        return {
            props: {
                categories: [],
                errorMessage
            },
        };
    }
}
