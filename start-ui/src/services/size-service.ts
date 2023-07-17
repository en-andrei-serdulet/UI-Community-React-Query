import create from './http-service';

export interface Pizza {
    id: number;
    name: string;
  }

export default create('/sizes');