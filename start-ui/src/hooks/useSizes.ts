import {useState, useEffect} from 'react';
import sizeService from '../services/size-service';
import { AxiosError, CanceledError } from '../services/api-client';

interface LocalCache {
    [key: string]: string[];
}

const localCache: LocalCache = {};

const useSizes = (crust: string) => {
    const [sizes, setSizes] = useState<string[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
        if (!crust) {
            setIsLoading(false);
            setSizes([]);
            return;
        }
        const cacheKey = "sizes_" + crust;
        if (localCache[cacheKey]) {
            setSizes(localCache[cacheKey]);
            setIsLoading(false);
        } else {
            setIsLoading(true);
            const { request, cancel } = sizeService.getAll<string>(crust);
            request
                .then((res) => {
                    localCache[cacheKey] = res.data;
                    setSizes(res.data);
                    setIsLoading(false);
                })
                .catch((err: AxiosError) => {
                    if (err instanceof CanceledError) return;
                    setError(err.message);
                    setIsLoading(false);
                });
      
            return () => cancel();
        }
    }, [crust]);


    return {
        sizes, error, isLoading, setSizes, setError
    }
}

export default useSizes;