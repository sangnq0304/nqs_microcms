import { useEffect } from "react";
import { RepositoryFactory } from "@/repositories/repository-factory";
import { useToast } from "@/contexts/toastMessage";
import { MESSAGE } from "@/constant/messages";
import Post from "@/components/Post";
import { buildCategoryTree } from "@/utils/category";
import Head from 'next/head';

import gridPost from "../../assets/scss/gridpost.module.scss";

export default function CategoryPage({ posts, errorMessage, category, categories }) {
    const { showToast } = useToast();

    useEffect(() => {
        if (errorMessage) {
            showToast(errorMessage, "error");
        }
    }, [errorMessage]);

    return (
        <>
            <Head>
                <title>{`Tin tức ${category}`}</title>
            </Head>
            <div className="container">
                <h2 className="page-title">Danh mục: {category}</h2>
                <div className={gridPost["grid-post"]}>
                        {posts.map((post) => {
                            return (
                                <div key={post.id} className={gridPost["grid-item"]}>
                                    <Post post={post} key={post.id} />
                                </div>
                            )
                        })}
                    </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const { category } = context.params;
    try {
        // Lấy bài viết theo danh mục
        const categoryRepo = RepositoryFactory.get("news");
        const response = await categoryRepo.getListByCategory(category);
        const posts = response?.data?.contents || [];

        const postsWithCategory = posts.map(post => ({
            ...post,
            category: { id: category } 
        }));

        // Lấy toàn bộ các danh mục làm menu
        const listCategory = RepositoryFactory.get("categories");
        const resCategories = await listCategory.getCategories();
        const data = resCategories?.data?.contents;
        const categories = buildCategoryTree(data);

        return {
            props: {
                posts: postsWithCategory,
                category,
                categories,
            },
        };
    } catch (e) {
        console.error("Error fetching data for category page:", e);
        return {
            props: {
                posts: [],
                errorMessage: MESSAGE.UNKNOWN_ERROR,
                category,
                categories: [],
            },
        };
    }
}