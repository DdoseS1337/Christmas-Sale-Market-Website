import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
    XCircle,
    DashCircle,
    DashCircleFill,
    PlusCircle,
    PlusCircleFill,
} from "react-bootstrap-icons";
import Image from "react-bootstrap/Image";

const ItemCard = (item: any) => {
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

    return (
        <>
            <Row className="text-center align-items-center">
                <Col
                    xs={4}
                    className="d-flex justify-content-between align-items-center"
                >
                    <Image
                        src="https://butik-elok.in.ua/files/resized/products/img_9037.800x600.jpg"
                        alt="{product.name}"
                        className="basket-product-image"
                    />
                    <span>Віденський вінок блакитний великий</span>
                </Col>
                <Col
                    xs={2}
                    className="white_theme d-flex justify-content-center"
                >
                    <div className="basket-storage">1</div>
                </Col>
                <Col xs={3} className="d-flex justify-content-center">
                    <Container
                        className="d-flex justify-content-between p-2 border rounded-pill w-50 align-items-center"
                        style={{ minWidth: "80px" }}
                    >
                        {isMinusHovered ? (
                            <DashCircleFill
                                className="basket-btn-quantity"
                                onMouseLeave={handleMinusMouseLeave}
                            />
                        ) : (
                            <DashCircle
                                className="basket-btn-quantity"
                                onMouseEnter={handleMinusMouseEnter}
                            />
                        )}
                        <span>1</span>
                        {isPlusHovered ? (
                            <PlusCircleFill
                                className="basket-btn-quantity"
                                onMouseLeave={handlePlusMouseLeave}
                            />
                        ) : (
                            <PlusCircle
                                className="basket-btn-quantity"
                                onMouseEnter={handlePlusMouseEnter}
                            />
                        )}
                    </Container>
                </Col>
                <Col xs={2}>1123 грн</Col>
                <Col className="d-flex justify-content-center">
                    <XCircle className="basket-close-btn" />
                </Col>
            </Row>
            <div className="basket-delimiter" />
        </>
    );
};

export default ItemCard;
