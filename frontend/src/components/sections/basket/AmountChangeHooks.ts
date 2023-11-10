import { useState } from "react";

const useHoverStates = () => {
    const [isMinusHovered, setIsMinusHovered] = useState(false);
    const [isPlusHovered, setIsPlusHovered] = useState(false);

    const handleMinusMouseEnter = () => {
        setIsMinusHovered(true);
    };

    const handleMinusMouseLeave = () => {
        setIsMinusHovered(false);
    };

    const handlePlusMouseEnter = () => {
        setIsPlusHovered(true);
    };

    const handlePlusMouseLeave = () => {
        setIsPlusHovered(false);
    };

    return {
        isMinusHovered,
        isPlusHovered,
        handleMinusMouseEnter,
        handleMinusMouseLeave,
        handlePlusMouseEnter,
        handlePlusMouseLeave,
    };
};

export default useHoverStates;