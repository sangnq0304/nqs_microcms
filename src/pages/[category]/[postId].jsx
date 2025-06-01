import { RepositoryFactory } from "@/repositories/repository-factory";
import { useToast } from "@/contexts/toastMessage";
import { MESSAGE } from "@/constant/messages";
import { useEffect } from "react";
import { buildCategoryTree } from "@/utils/category";

export default function PostDetail({ post, categories, errorMessage }) {
    const { showToast } = useToast();

    useEffect(() => {
        if (errorMessage) {
            showToast(errorMessage, "error");
        }
    }, [errorMessage]);

    if (!post) return <div>Không tìm thấy bài viết</div>;

    return (
        <div className="container">
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
    );
}

export async function getServerSideProps(context) {
    const { postId } = context.params;
    try {
        // Lấy chi tiết bài viết
        const postRepo = RepositoryFactory.get("news");
        const response = await postRepo.getPostById(postId);
        const post = response?.data;

        // Lấy toàn bộ các danh mục làm menu
        const listCategory = RepositoryFactory.get("categories");
        const resCategories = await listCategory.getCategories();
        const data = resCategories?.data?.contents;
        const categories = buildCategoryTree(data);

        return {
            props: {
                post,
                categories
            },
        };
    } catch (e) {
        return {
            props: {
                post: null,
                categories: [],
                errorMessage: MESSAGE.UNKNOWN_ERROR,
            },
        };
    }
}