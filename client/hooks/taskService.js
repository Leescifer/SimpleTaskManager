import api from '../lib/axios'

export const getTasks = async () => {
    const res = await api.get('/tasks');
    return res.data.data;
};

export const getTask = async (id) => {
    const res = await api.get(`/tasks/${id}`);
    return res.data.data;
};

export const addTask = async (task) => {
    const res = await api.post('/tasks', task);
    return res.data.data;
};
export const updateTask = async (id, updates) => {
    const res = await api.put(`/tasks/${id}`, updates);
    return res.data.data;
};

export const deleteTask = async (id) => {
    const res = await api.delete(`/tasks/${id}`);
    return res.data;
};
