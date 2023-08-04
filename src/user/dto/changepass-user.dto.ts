import { IsNotEmpty } from "class-validator";

export class ChangePassUsersDto{
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    password_new: string;
}