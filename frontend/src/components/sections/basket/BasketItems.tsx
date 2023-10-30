import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";
import { CartService } from "../../../services/basketService";

const BasketItems = (props: any) => {
    CartService.loadCart();
    const cartItems = CartService.getCart();
    const totalCartPrice = CartService.getTotalPrice(); // Отримання загальної суми

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

            {cartItems.map((item) => (
                <ItemCard key={item.id} item={item} />
            ))}

            <Container
                fluid
                className="d-flex justify-content-between p-0 mt-4 align-items-center"
            >
                <Link
                    to="/catalog"
                    className="arrow-button"
                    style={{ width: "16rem" }}
                >
                    <span className="arrow"></span>Повернутись до каталогу
                </Link>
                <Container
                    className="px-3 py-2 m-0 d-flex justify-content-between align-items-center"
                    style={{ width: "22rem" }}
                >
                    <h3 className="p-0 m-0">{totalCartPrice} ₴</h3>
                    <Link
                        to="/basket/order"
                        className="btn-red-theme link-settings p-2"
                    >
                        <span>Оформити замовлення</span>
                    </Link>
                </Container>
            </Container>
        </Container>
    );
};

export default BasketItems;
