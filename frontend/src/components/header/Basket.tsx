import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { BagDash, BagDashFill } from "react-bootstrap-icons";
import { CartService } from "../../services/basketService";
import { BREAKPOINTS } from "../../common";
import { useMediaQuery } from "react-responsive";

const Basket = () => {
    const isTablet = useMediaQuery({
        minWidth: BREAKPOINTS.TABLET.HEADER.BASKET,
    });

    const [isHovered, setIsHovered] = useState(false);
    // const [amount, setAmount] = useState(CartService.getTotalAmount());

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    // useEffect(() => {
    //     setAmount(CartService.getTotalAmount());
    // }, [localStorage.getItem(`christmasMarketBasket`)]);

    return (
        <Row onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Col className="d-flex align-items-center  p-0">
                <button className="position-relative btn-basket">
                    {isHovered ? (
                        <BagDashFill className="text-light basket-sizer" />
                    ) : (
                        <BagDash className="text-light basket-sizer" />
                    )}
                    {/* <span className="position-absolute top-25 start-75 translate-middle badge rounded-pill white_theme">
                        {amount}
                    </span> */}
                </button>
            </Col>
            {isTablet && (
                <Col className="d-flex justify-content-start align-items-center">
                    <p className="fw-bold" style={{ margin: "-4px" }}>
                        Кошик
                    </p>
                    {/* <span className="fw-bold" style={{ whiteSpace: "nowrap" }}>
                        0 грн
                    </span> */}
                </Col>
            )}
        </Row>
    );
};

export default Basket;
