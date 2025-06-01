import Repository from "../repository";
const resource = 'news/';

export default {
    getListByCategory(categoryId) {
        return Repository.get(`${resource}?filters=category[contains]${categoryId}`);
    },

    getPostById(id) {
        return Repository.get(`${resource}${id}`);
    }
}