import axios from 'axios';

export default {
    all(page = 0) {
        return axios.get(`/api/users?page=${page}`);
    },
    find(id) {
        return axios.get(`/api/users/${id}`);
    },
    update(id, data) {
        return axios.put(`/api/users/${id}`, data);
    }
};
