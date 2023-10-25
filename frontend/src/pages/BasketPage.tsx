import { Col, Container, Row } from "react-bootstrap";
import BasketItems from "../components/sections/basket/BasketItems";
import CartTotal from "../components/sections/basket/CartTotal";
import "../styles/components/basket.css";
import { Link } from "react-router-dom";
import lottie from "lottie-web";
import { useEffect } from "react";

const BasketPage = () => {
    useEffect(() => {
        const container = document.getElementById("lottie-container");
        if (container) {
            container.innerHTML = "";
            const animationDiv = document.createElement("div");
            container.appendChild(animationDiv);
            lottie.loadAnimation({
                container: animationDiv as Element,
                renderer: "canvas" as any,
                loop: true,
                autoplay: true,
                path: "/images/pictures/basket.json",
            });
        }
    }, []);

    return localStorage.christmasMarketBasket ? (
        <>
            <h1 className="text-center basket-logo">Кошик</h1>
            <Container className="mt-5">
                <Row>
                    <Col xs={9}>
                        <BasketItems />
                    </Col>
                    <Col>
                        <CartTotal />
                    </Col>
                </Row>
            </Container>
        </>
    ) : (
        <Container className="text-center">
            <div
                id="lottie-container"
                style={{
                    width: "70rem",
                    height: "36rem",
                    margin: "auto",
                    marginTop: "-5rem",
                }}
            />
            <h2 style={{ marginTop: "-3rem" }}>Ваш кошик порожній</h2>
            <h5 className="mt-3 text-secondary">
                Але це ніколи не пізно виправити!
            </h5>
            {/* <Link to="/catalog" className="arrow-button btn-red-theme">
                <span className="arrow"></span>Повернутись до каталогу
            </Link> ARROW BUTTON HERE */}
            <Link to="/catalog">
                <button className="mt-4 btn-red-theme p-2">
                    Повернутись до каталогу
                </button>
            </Link>
        </Container>
    );
};

export default BasketPage;
