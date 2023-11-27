import { useState, useEffect } from "react";
import { ArrowUpShort } from "react-bootstrap-icons";

const ScrollButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 600) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div
            className={`scroll-up-button ${isVisible ? "visible" : ""}`}
            onClick={scrollToTop}
        >
            <ArrowUpShort size={50} />
        </div>
    );
};

export default ScrollButton;
