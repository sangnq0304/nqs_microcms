import PostsRepository from "./config/posts";
import CategoriesRepository from "./config/categories";
const repositories = {
    news: PostsRepository,
    categories: CategoriesRepository
};

export const RepositoryFactory = {
    get: (name) => repositories[name],
};
