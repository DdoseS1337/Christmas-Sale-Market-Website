import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { BagDash, BagDashFill } from "react-bootstrap-icons";

const Basket = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <Row onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Col>
                <button className="position-relative btn-basket">
                    {isHovered ? (
                        <BagDashFill className="text-light basket-sizer" />
                    ) : (
                        <BagDash className="text-light basket-sizer" />
                    )}
                    <span
                        className="position-absolute top-25 start-75 translate-middle badge rounded-pill white_theme"
                        id="item-counter"
                    >
                        0
                    </span>
                </button>
            </Col>
            <Col className="d-flex flex-column justify-content-start">
                <p style={{ margin: "-4px" }}>Кошик</p>
                <span id="basket-cost" className="fw-bold">
                    0грн
                </span>
            </Col>
        </Row>
    );
};

export default Basket;
