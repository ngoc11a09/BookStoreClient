export interface IUserInfo {
    name: string
    lastName: string
    birthday: Date | null
    gender: '0' | '1' | 'unknow' | null
    phone: string
    address: string[]
}