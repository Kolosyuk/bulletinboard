import { User } from './user.interface';
import { Category } from './category.interface';

export interface Advert {
    id: number;
    user: User;
    name: string;
    description: string;
    isActive: boolean;
    imagesIds: string[];
    cost: number;
    email: string;
    phone: string;
    location: string;
    createdAt: string;
    category: Category;
};

export interface PostAdvertForm {
    name: string;
    description: string;
    images: any[];
    cost: number;
    email: string;
    phone: string;
    location: string;
    category: Category;
};