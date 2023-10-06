'use client'
import { Autocomplete, CircularProgress, Paper, TextField, } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDebounce } from 'usehooks-ts';
interface Option<T> {
    label: string;
    value: T;
}

export interface AutoCompleteFetchResponse<T> {
    options: Option<T>[];
    hasMore: boolean;
}

interface FetchAutoCompleteProps<T> {
    fetch: (query: string, page: number) => Promise<AutoCompleteFetchResponse<T>>;
    placeholder: string;
    onChange: (selectedOption: Option<T> | null) => void;
    debounce?: number | 600
}
function FetchAutoComplete<T>(props: FetchAutoCompleteProps<T>) {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<Option<T>[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const hasMore = useRef(true);

    const inputDebounce = useDebounce(inputValue, props.debounce);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await props.fetch(inputDebounce, page);
            if (page === 1) {
                // If it's the first page, replace the existing options
                setOptions(response.options);
            } else {
                // If it's a subsequent page, append the new options
                setOptions((prevOptions) => [...prevOptions, ...response.options]);
            }
            hasMore.current = response.hasMore;
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }, [inputDebounce, page, props]);


    useEffect(() => {
        fetchData();
    }, [fetchData]);



    const handleInputChange = (value: string) => {
        setInputValue(value);
        setPage(1); // Reset page when input value changes
        hasMore.current = true; // Reset the hasMore flag
    };

    const handleScroll = (event: React.SyntheticEvent) => {
        const listboxNode = event.currentTarget;
        if (listboxNode.scrollTop + listboxNode.clientHeight === listboxNode.scrollHeight) {
            setPage((prevPage) => prevPage + 1);
        }
    }
    return (
        <Autocomplete
            options={options}
            getOptionLabel={(option) => option.label}
            loading={loading}
            onChange={(event, newValue) => {
                props.onChange(newValue);
            }}
            onInputChange={(e, value) => handleInputChange(value)}
            ListboxProps={{ onScroll: handleScroll }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={props.placeholder}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    )
}

export default FetchAutoComplete


{/* <FetchAutoComplete
placeholder={'Number'}
fetch={async (query, page) => {
    const response = await appxios.get<number[]>(`http://localhost:5000/main?query=${query}&page=${page}`);
    return { hasMore: true, options: response.data.map(item => ({ label: item.toString(), value: item })) };
}}
onChange={option => {
    console.log(option?.value);
}} /> */}