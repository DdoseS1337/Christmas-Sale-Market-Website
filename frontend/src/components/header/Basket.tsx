import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { BagDash, BagDashFill } from "react-bootstrap-icons";
import { CartService } from "../../services/basketService";

const Basket = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [amount, setAmount] = useState(CartService.getTotalAmount());

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    useEffect(() => {
        setAmount(CartService.getTotalAmount());
    }, [localStorage.getItem(`christmasMarketBasket`)]);

    return (
        <Row onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Col>
                <button className="position-relative btn-basket">
                    {isHovered ? (
                        <BagDashFill className="text-light basket-sizer" />
                    ) : (
                        <BagDash className="text-light basket-sizer" />
                    )}
                    <span className="position-absolute top-25 start-75 translate-middle badge rounded-pill white_theme">
                        {amount}
                    </span>
                </button>
            </Col>
            <Col className="d-flex flex-column justify-content-start">
                <p style={{ margin: "-4px" }}>Кошик</p>
                <span className="fw-bold" style={{ whiteSpace: "nowrap" }}>
                    0 грн
                </span>
            </Col>
        </Row>
    );
};

export default Basket;
