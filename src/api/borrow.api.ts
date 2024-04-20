import api from "./api.interceptor"
import { getOne } from "./user.api"

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

export const getOneBorrow = (id: string) => {
    try {
        return (api.get(`/api/borrows/${id}`)) as Promise<IBorrow>
    } catch (error) {
        // console.log(error);
        return Promise.reject(error)
    }
}

export const getBorrowOfUSer = async (id: string) => {
    let user
    try {
        const res = await getOne(id)
        user = res.user
    } catch (error) {
        return Promise.reject(error)
    }
    try {
        return (api.get(`/api/borrows`, { params: { userCode: user.uId } })) as Promise<IBorrow[]>
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