import * as Yup from 'yup'
export interface RSeat {
    seatId: number;
    price: number;
    name: string;
}
export interface CSeat {
    name: string;
    price: number;
    busId: number;
}
export interface USeat extends CSeat {
    seatId: number;
}