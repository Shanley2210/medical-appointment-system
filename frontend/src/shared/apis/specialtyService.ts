import api from './api';

export const postSpecialty = async (data: FormData) => {
    return await api.post(`/admin/specialty`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const deleteSpecialty = async (id: number) => {
    return await api.delete(`/admin/specialty/${id}`);
};

export const updateSpecialty = async (id: number, data: FormData) => {
    return await api.put(`/admin/specialty/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
