import { GameModel, ReviewModel } from '@models';


export interface NewUserRequest {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
}

export interface NewUserForm {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password1: string;
    password2: string;
    privacy: boolean;
}

export interface UserModel {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
}

export interface UserProfileModel {
    first_name: string;
    last_name: string;
    username: string;
    is_following: boolean;
}

export interface UserCardModel {
    username: string;
    likes: number;
    dislikes: number;
    reviews: number;
}

export interface LoginForm {
    username: string;
    password: string;
}

export interface NeewsfeedItem {
    game: {
        game: GameModel;
        review?: ReviewModel;
    };
    recomends: boolean;
    username: string;
}
