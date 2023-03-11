import knex from "knex";
import { IUser } from "models/Authentication";
import { Inject, Service } from "typedi";
import { IUserRepository } from "./IUserRepository";
import knexConfig from "../../knexfile";
@Service()
export class UserRepository implements IUserRepository {
    private _knex = knex(knexConfig);

    public async createUser(entity: IUser): Promise<void> {
        try {
            await this._knex('users').insert(entity);
            console.log(`Insert user : ${entity.name}`);
        } catch (error) {
            console.log(error);

        }
    }

    public async getUserByEmail(email: string): Promise<IUser> {
        try {
            const user = await this._knex('users').where('email', email).first();
            return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    public async getUserByUserID(user_id: string): Promise<IUser> {
        try {
            const user = await this._knex('users').where('id', user_id).first();
            return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    public async updateMultiFactor(user_id: string, multiFactor: boolean, secret: string): Promise<void> {
        try {
            if (!multiFactor) {
                await this._knex('users')
                    .where('id', user_id)
                    .update('multi_factor', multiFactor)
                    .update('secret', secret)
            } else {
                await this._knex('users')
                    .where('id', user_id)
                    .update('multi_factor', multiFactor)
                    .update('secret', secret)
            }

        } catch (error) {

        }
    }

}