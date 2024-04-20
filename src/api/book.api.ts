import type { IPublisher } from "@/interfaces/publisher.interface";
import api from "./api.interceptor";

export interface IBookRes {
    _id: string
    code: string
    title: string
    price: number
    quantity: number;
    publishYear: number;
    publishCode: string;
    publisher?: IPublisher;
    author: string;
    createdAt: Date
    updatedAt: Date
}
export interface IGetOneBookRes {
    message: String
    book: IBookRes
}
export const getAllBooks = async () => {
    try {
        return (await api.get('/api/books')) as IBookRes[]
    } catch (error) {
        return Promise.reject(error)
    }
}
export const getOneBook = (id: string) => {
    try {
        return (api.get(`/api/books/${id}`)) as Promise<IGetOneBookRes> || {}
    } catch (error) {
        return Promise.reject(error)
    }
}