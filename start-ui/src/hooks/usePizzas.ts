import {useState, useEffect} from 'react';
import pizzaService, { Pizza } from '../services/pizza-service';
import { AxiosError, CanceledError } from '../services/api-client';

interface LocalCache {
    [key: string]: Pizza[];
  }

const localCache: LocalCache = {};

const usePizzas = () => {
    const [pizzas, setPizzas] = useState<Pizza[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
        if (localCache["pizzas"]) {
            setPizzas(localCache["pizzas"]);
            setIsLoading(false);
          } else {
            setIsLoading(true);
            const { request, cancel } = pizzaService.getAll<Pizza>();
            request
              .then((res) => {
                localCache["pizzas"] = res.data;
                setPizzas(res.data);
                setIsLoading(false);
              })
              .catch((err: AxiosError) => {
                if (err instanceof CanceledError) return;
                setError(err.message);
                setIsLoading(false);
              });
      
            return () => cancel();
          }
    }, []);


    return {
        pizzas, error, isLoading, setPizzas, setError
    }

}

export default usePizzas;