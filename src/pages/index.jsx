import { useEffect } from "react";
import { RepositoryFactory } from "@/repositories/repository-factory";
import { useToast } from "@/contexts/toastMessage";
import { buildCategoryTree } from "@/utils/category";
import { MESSAGE } from "@/constant/messages";

import Post from "@/components/Post";
import gridPost from "../assets/scss/gridpost.module.scss";

export default function Home({ dataNewNews, categories, errorMessage }) {
    const { showToast } = useToast();

    useEffect(() => {
        if (errorMessage) {
            showToast(errorMessage, "error");
        }
    });

    return (
        <div className="home-page">
            <div className="container">
                <div className={gridPost["grid-post"]}>
                    {dataNewNews.length > 0 &&
                        dataNewNews.map((post) => {
                            return (
                                <div
                                    key={post.id}
                                    className={gridPost["grid-item"]}
                                >
                                    <Post post={post} key={post.id} />
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    try {
        // Lấy bài viết mới nhất
        const newNews = RepositoryFactory.get("news");
        const responseNewNews = await newNews.getListByCategory("tin-moi");
        const dataNewNews = responseNewNews?.data?.contents;

        // Lấy toàn bộ các danh mục làm menu
        const listCategory = RepositoryFactory.get("categories");
        const response = await listCategory.getCategories();
        const data = response?.data?.contents;
        const categories = buildCategoryTree(data);

        return {
            props: {
                categories,
                dataNewNews,
            },
        };
    } catch (e) {
        console.log("error:", e);
        const errorMessage = MESSAGE.UNKNOWN_ERROR;

        return {
            props: {
                categories: [],
                dataNewNews,
                errorMessage,
            },
        };
    }
}
