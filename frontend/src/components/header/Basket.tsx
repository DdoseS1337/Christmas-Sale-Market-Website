import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { BagDash, BagDashFill } from "react-bootstrap-icons";
import { BREAKPOINTS } from "../../common";
import { useMediaQuery } from "react-responsive";

const Basket = () => {
	const isTablet = useMediaQuery({
		minWidth: BREAKPOINTS.TABLET.HEADER.BASKET,
	});

	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<Row onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<Col className="d-flex align-items-center  p-0">
				<button className="position-relative btn-basket">
					{isHovered ? (
						<BagDashFill className="text-light basket-sizer" />
					) : (
						<BagDash className="text-light basket-sizer" />
					)}
				</button>
			</Col>
			{isTablet && (
				<Col className="d-flex justify-content-start align-items-center">
					<p className="fw-bold" style={{ margin: "-4px" }}>
						Кошик
					</p>
				</Col>
			)}
		</Row>
	);
};

export default Basket;
