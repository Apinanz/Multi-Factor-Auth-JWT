import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
    id: string;
    name: string;
    email: string;
    password: string;
    multi_factor: boolean
    created_at: Date;
    updated_at: Date;
}
