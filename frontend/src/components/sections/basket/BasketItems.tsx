import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { XCircle } from "react-bootstrap-icons";

const BasketItems = () => {
    return (
        <Container className="border rounded py-3 position-relative">
            <Row className="text-center">
                <Col>Продукт</Col>
                <Col>Постачальник</Col>
                <Col>Вартість</Col>
                <Col>Кількість</Col>
                <Col>Всього</Col>
                <Col></Col>
            </Row>
            <Row className="text-center">
                <Col>Продукт</Col>
                <Col>Постачальник</Col>
                <Col>Вартість</Col>
                <Col>Кількість</Col>
                <Col>Всього</Col>
                <Col className="d-flex justify-content-center">
                    <XCircle className="basket-close-btn" />
                </Col>
            </Row>
            <Link
                to="/catalog"
                className="arrow-button position-absolute"
                style={{ width: "16rem", bottom: "1rem", left: "1rem" }}
            >
                <span className="arrow"></span>Повернутись до каталогу
            </Link>
        </Container>
    );
};

export default BasketItems;
