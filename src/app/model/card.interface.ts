export type Cards = Card[]

export interface Card {
    id: number;
    title: string;
    price: number;
    image: string;
    adress: string;
    date: string;
    description?: string;
}