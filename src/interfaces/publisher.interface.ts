export interface IPublisher {
    _id: string;
    code: string;
    name: string;
    address: string;
    createdAt: Date
    updatedAt: Date
}

export interface IPublisherInfo {
    _id: string;
    code: string;
    name: string;
    address: string;
}