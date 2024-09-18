export const debounce = (fn: (...args: any[]) => void, delay: number | undefined) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (...args:any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}