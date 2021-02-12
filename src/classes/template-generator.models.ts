/**
 * Containing 
 */
export interface Option {
    users: string[]; // name of the users
    value: string; // the answer, can be a mock or the real answer
    letter?: string; // ABCD
}

export interface Question {
    realAnswer: string;
    imageUrl: string;
    painter: string;
    options: Option[];
}