import { useState, useEffect } from "react";
import { ArrowUpCircle, ArrowUpCircleFill } from "react-bootstrap-icons";

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
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{isHovered ? (
				<ArrowUpCircleFill size={50} style={{ color: "#c93f4f" }} />
			) : (
				<ArrowUpCircle size={50} style={{ color: "#c93f4f" }} />
			)}
		</div>
	);
};

export default ScrollButton;
