import Repository from "../repository";
const resource = "users";

export default {
    getListUser() {
        return Repository.get(`${resource}`);
    }
}