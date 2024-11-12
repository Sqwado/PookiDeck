
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const useUpdateSearchParam = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const updateSearchParam = useCallback((key, value, reverse = false) => {
        if (Array.isArray(value)) {
            value.length > 0 ? searchParams.set(key, value.join(',')) : searchParams.delete(key);
        } else {
            if (reverse) {
                !value ? searchParams.set(key, value) : searchParams.delete(key);
            } else {
                value ? searchParams.set(key, value) : searchParams.delete(key);
            }
        }
        setSearchParams(searchParams);
    }, [searchParams, setSearchParams]);

    return updateSearchParam;
};

export default useUpdateSearchParam;
