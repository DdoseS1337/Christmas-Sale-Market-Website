import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";

const BasketItems = (props: any) => {
    return (
        <Container className="border rounded py-3">
            <Row className="text-center">
                <Col xs={4}>Продукт</Col>
                <Col xs={2}>Склад</Col>
                <Col xs={3}>Кількість</Col>
                <Col xs={2}>Всього</Col>
                <Col></Col>
            </Row>
            <div className="basket-delimiter" />
            {/* <ItemCard /> */}
            <Link
                to="/catalog"
                className="arrow-button mt-4"
                style={{ width: "16rem"}}
            >
                <span className="arrow"></span>Повернутись до каталогу
            </Link>
        </Container>
    );
};

export default BasketItems;
