import { useState, useEffect } from 'react';

// Adapted from https://usehooks.com/useWindowSize/
interface WindowSize {
    width: number;
    height: number;
}

export function useWindowSize() {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}

export function insertSubstring(str: string, index: number, stringToAdd: string) {
    return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
}