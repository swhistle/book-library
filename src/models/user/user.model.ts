import { Schema, model, Document } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export const UserModel = model<Document & IUser>('User', userSchema);