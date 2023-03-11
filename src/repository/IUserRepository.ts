import { IUser } from "models/Authentication";

export interface IUserRepository {
    createUser(entity: IUser): Promise<void>;
    getUserByEmail(email: string): Promise<IUser>;
    getUserByUserID(user_id: string): Promise<IUser>;
    updateMultiFactor(user_id: string, multiFactor: boolean, secret: string): Promise<void>;
}