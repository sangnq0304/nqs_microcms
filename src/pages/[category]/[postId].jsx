import { RepositoryFactory } from "@/repositories/repository-factory";
import { useToast } from "@/contexts/toastMessage";
import { MESSAGE } from "@/constant/messages";
import { useEffect } from "react";
import { buildCategoryTree } from "@/utils/category";
import Head from 'next/head';

export default function PostDetail({ post, categories, errorMessage, postCategorySlug }) {
    const { showToast } = useToast();

    useEffect(() => {
        if (errorMessage) {
            showToast(errorMessage, "error");
        }
    }, [errorMessage]);

    if (!post) return <div>Không tìm thấy bài viết</div>;

    return (
        <>
            <Head>
                <title>{post.title}</title>
            </Head>
            <div>
                <div className="container">
                    <h1>{post.title}</h1>
                    {post.category && <h2>Danh mục: {post.category.name}</h2>}
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const { category, postId } = context.params;

    try {
        const postRepo = RepositoryFactory.get("news");
        const response = await postRepo.getPostById(postId);
        const post = response?.data;

        let postCategorySlug = null;
        if (post?.category?.id) {
            postCategorySlug = post.category.id;
        } else if (post?.category) {
            postCategorySlug = post.category;
        }

        const listCategory = RepositoryFactory.get("categories");
        const resCategories = await listCategory.getCategories();
        const categoriesData = resCategories?.data?.contents;
        const categories = buildCategoryTree(categoriesData);

        return {
            props: {
                post,
                categories,
                postCategorySlug,
            },
        };
    } catch (e) {
        console.error("Error fetching post detail:", e);
        return {
            props: {
                post: null,
                categories: [],
                errorMessage: MESSAGE.UNKNOWN_ERROR,
                postCategorySlug: null,
            },
        };
    }
}