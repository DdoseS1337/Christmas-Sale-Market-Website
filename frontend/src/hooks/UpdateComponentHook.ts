import { useState } from "react"

export const useRefresh = () => {
    const [, setRefresh] = useState<boolean>(true);
    return () => {
        setRefresh(old => {
            return !old
        });
    };
}