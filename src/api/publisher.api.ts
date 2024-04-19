import { type IPublisher } from "../interfaces/publisher.interface"
import api from "./api.interceptor"

export const getAllPublishers = async () => {
    try {
        return (await api.get('/api/publishers')) as IPublisher[]
    } catch (error) {
        return Promise.reject(error)
    }
}