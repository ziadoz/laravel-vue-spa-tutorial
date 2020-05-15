import axios from 'axios';

const client = axios.create({
   baseURL: '/api',
});

export default {
    all(page = 0) {
        return client.get(`/users?page=${page}`);
    },
    find(id) {
        return client.get(`/users/${id}`);
    },
    create(data) {
        return client.post('/users', data);
    },
    update(id, data) {
        return client.put(`/users/${id}`, data);
    },
    delete(id) {
        return client.delete(`/users/${id}`);
    }
};
