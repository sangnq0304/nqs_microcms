import ProductsRepository from "./config/products.js";
import UsersRepository from "./config/users.js";
const repositories = {
    products: ProductsRepository,
    users: UsersRepository
};

export const RepositoryFactory = {
    get: (name) => repositories[name],
};
