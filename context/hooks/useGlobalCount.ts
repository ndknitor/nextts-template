import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
interface GlobalCountState {
    count: number;
    setCount: (v: number) => void;
}
const useGlobalCount = create<GlobalCountState>()(
    (set) => ({
        count: 0,
        setCount: (v) => set(state => ({ count: v }))
    }),
);
export default useGlobalCount;