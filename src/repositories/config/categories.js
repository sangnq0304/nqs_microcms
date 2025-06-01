import Repository from "../repository";
const resource = 'categories';

export default {
    getCategories() {
        return Repository.get(`${resource}`);
    }
}