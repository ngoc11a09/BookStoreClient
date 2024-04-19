import api from "./api.interceptor"

export interface IBorrow {
    _id?: string
    code: string
    userCode: string
    bookCode: string
    returnDate: Date | null
    borrowedDate: Date | null
    createdAt?: Date
    updatedAt?: Date
}

export const getAllBorrows = async () => {
    try {
        return (await api.get('/api/borrows')) as IBorrow[]
    } catch (error) {
        return Promise.reject(error)
    }
}

export const getOne = (id: string) => {
    try {
        return (api.get(`/api/borrows/${id}`)) as Promise<IBorrow>
    } catch (error) {
        // console.log(error);
        return Promise.reject(error)
    }
}

export const getBorrowOfUSer = (id: string) => {
    try {
        return (api.get(`/api/borrows`, { params: { userCode: id } })) as Promise<IBorrow[]>
    } catch (error) {
        // console.log(error);
        return Promise.reject(error)
    }
}

export const create = (data: IBorrow) => {
    try {
        return api.post(`/api/borrows/add`, data)
    } catch (error) {
        return Promise.reject(error)
    }
}