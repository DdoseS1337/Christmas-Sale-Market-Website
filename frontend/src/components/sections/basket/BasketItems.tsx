import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";
import { CartService, CartItem } from "../../../services/basketService";
import AnimatedEmptyPage from "./AnimatedEmptyPage";

const BasketItems = () => {
    const [cartItems, setCartItems] = useState(CartService.getCart());
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [isEmpty, setEmpty] = useState(false);

    useEffect(() => {
        const totalPrice = CartService.getTotalPrice();
        setTotalCartPrice(totalPrice);
        if (cartItems.length === 0) setEmpty(true);
    }, [cartItems]);

    const updateCart = (newCart: CartItem[]) => {
        setCartItems(newCart);
        CartService.saveCart(newCart);
    };

    const removeItemFromCart = (itemId: string) => {
        CartService.removeFromCart(itemId);
        updateCart(cartItems.filter((item) => item.id !== itemId));
    };

    const handleAmountChanged = (newPrice: number) => {
        setTotalCartPrice(() => {
            return newPrice;
        });
    };

    return isEmpty ? (
        <AnimatedEmptyPage
            link="/catalog"
            title="Ваш кошик порожній"
            description="Але це ніколи не пізно виправити!"
            buttonTitle="Повернутись до каталогу"
        />
    ) : (
        <>
            <h1 className="text-center basket-logo">Кошик</h1>
            <Container className="border rounded py-3 mt-4">
                <Row className="text-center" id="basket-description-columns">
                    <Col xs={5}>Товар</Col>
                    <Col xs={1}>Склад</Col>
                    <Col xs={3}>Кількість</Col>
                    <Col xs={2}>Всього</Col>
                    <Col></Col>
                </Row>
                <div className="basket-delimiter" id="basket-first-delimiter" />

                {cartItems.map((item) => (
                    <ItemCard
                        key={item.id}
                        item={item}
                        onItemRemoved={removeItemFromCart}
                        onAmountChanged={handleAmountChanged}
                    />
                ))}

                <Container
                    fluid
                    className="d-flex justify-content-between p-0 mt-4 align-items-center"
                >
                    <Link
                        to="/catalog"
                        className="arrow-button"
                        id="basket-back-to-catalog-btn"
                    >
                        <span className="arrow"></span>
                        <span id="basket-visible-adaptivity">
                            Повернутись до каталогу
                        </span>
                        <span
                            id="basket-hidden-adaptivity"
                            hidden
                            style={{ whiteSpace: "nowrap" }}
                        >
                            До каталогу
                        </span>
                    </Link>
                    <Container
                        className="px-3 py-2 m-0 d-flex justify-content-between align-items-center"
                        style={{ width: "22rem" }}
                        id="basket-submit-container"
                    >
                        <h3
                            className="p-0 m-0"
                            style={{ whiteSpace: "nowrap" }}
                        >
                            <span id="basket-total-price-span-adaptivity" className="m-0" hidden>Всього: </span>
                            {totalCartPrice} ₴
                        </h3>
                        <Link
                            to="/basket/order"
                            className="btn-red-theme link-settings p-2"
                        >
                            <span id="basket-visible-adaptivity">
                                Оформити замовлення
                            </span>
                            <span hidden id="basket-hidden-adaptivity">
                                Замовити
                            </span>
                        </Link>
                    </Container>
                </Container>
            </Container>
        </>
    );
};

export default BasketItems;
