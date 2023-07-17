import create from './http-service';

export interface Pizza {
    id: number;
    name: string;
    ingredients: string,
    price: number,
    crust: string,
    size:string
  }

export default create('/pizzas');