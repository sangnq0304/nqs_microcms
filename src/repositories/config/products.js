import Repository from "../repository";
const resource = "products";

export default {
    getProducts() {
        return Repository.get(`${resource}`);
    },

    getProductById(id) {
        return Repository.get(`${resource}/${id}`);
    },

    getProductsByCategory(category) {
        return Repository.get(`${resource}/category/${category}`);
    },

    createProduct(data) {
        return Repository.post(`${resource}`, data);
    },

    updateProduct(id, data) {
        return Repository.put(`${resource}/${id}`, data);
    },

    deleteProduct(id) {
        return Repository.delete(`${resource}/${id}`);
    },
};
