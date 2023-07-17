import { FieldError } from "react-hook-form";

export interface FormInputs {
    name: string;
    ingredients: string;
    crust: string;
    price: number;
    size: string;
  }
  
export interface Errors {
    name?: FieldError;
    ingredients?: FieldError;
    crust?: FieldError;
    price?: FieldError;
    size?: FieldError;
  }