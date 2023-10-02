import { useState } from "react";
import { useDebounce } from "usehooks-ts";

export function useStateDebounce<T>(initValue?: T, delay: number = 600) {
    const [state, setState] = useState(initValue);
    const debounce = useDebounce(state, delay);
    return [state, setState, debounce];
}