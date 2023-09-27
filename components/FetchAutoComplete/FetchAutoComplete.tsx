'use client'
import { Autocomplete, CircularProgress, Paper, TextField, } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDebounce } from 'usehooks-ts';
interface Option<T> {
    label: string;
    value: T;
}

interface FetchAutoCompleteProps<T> {
    fetch: (query: string, page: number) => Promise<Option<T>[]>;
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

    useEffect(() => {
        let active = true;
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await props.fetch(inputValue, page);
                if (active) {
                    if (page === 1) {
                        // If it's the first page, replace the existing options
                        setOptions(response);
                    } else {
                        // If it's a subsequent page, append the new options
                        setOptions((prevOptions) => [...prevOptions, ...response]);
                    }
                    if (response.length === 0) {
                        // No more data to load
                        hasMore.current = false;
                    }
                    setLoading(false);
                }
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        if (inputValue !== undefined) {
            fetchData();
        } else {
            setOptions([]);
        }

        return () => {
            active = false;
        };
    }, [inputDebounce, props.fetch, page]);



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