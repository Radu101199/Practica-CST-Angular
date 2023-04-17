export interface Car {
    description: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    horsepower: number;
    mileage: number;
    [key: string]: string | any;
}