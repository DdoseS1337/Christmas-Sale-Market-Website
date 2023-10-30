import { Container } from "react-bootstrap";
import BasketItems from "../components/sections/basket/BasketItems";
import { Link } from "react-router-dom";
import lottie from "lottie-web";
import { useEffect, useState } from "react";
import "../styles/components/basket.css";

const AnimatedBasket = () => {
    const [isAnimationLoaded, setIsAnimationLoaded] = useState(false);

    useEffect(() => {
        const container = document.getElementById("lottie-container");

        if (container && !isAnimationLoaded) {
            container.innerHTML = "";
            const animationDiv = document.createElement("div");
            animationDiv.style.width = "60rem";
            animationDiv.style.marginTop = "-30px";
            container.appendChild(animationDiv);
            lottie.loadAnimation({
                container: animationDiv as Element,
                renderer: "canvas" as any,
                loop: true,
                autoplay: true,
                path: "/images/pictures/basket.json",
            });
            setIsAnimationLoaded(true);
        }
    }, [isAnimationLoaded]);

    return (
        <Container className="text-center">
            <Container
                fluid
                id="lottie-container"
                className="d-flex justify-content-center"
            />
            <h2 className="mt-3">Ваш кошик порожній</h2>
            <h5 className="mt-3 text-secondary">
                Але це ніколи не пізно виправити!
            </h5>
            <Link to="/catalog" className="link-settings">
                <button className="arrow-button mx-auto mt-4 arrow-button-red-theme">
                    <span className="arrow"></span>Повернутись до каталогу
                </button>
            </Link>
        </Container>
    );
};

const BasketPage = () => {
    function useLocalStorageExists(key: any) {
        const [localStorageExists, setLocalStorageExists] = useState(
            !!localStorage.getItem(key)
        );

        useEffect(() => {
            const storageChangeHandler = () => {
                setLocalStorageExists(!!localStorage.getItem(key));
            };

            window.addEventListener("storage", storageChangeHandler);

            return () => {
                window.removeEventListener("storage", storageChangeHandler);
            };
        }, [key]);

        return localStorageExists;
    }

    const localStorageExists = useLocalStorageExists("christmasMarketBasket");

    return localStorageExists ? (
        <>
            <h1 className="text-center basket-logo">Кошик</h1>
            <Container className="mt-5">
                <BasketItems />
            </Container>
        </>
    ) : (
        <AnimatedBasket />
    );
};

export default BasketPage;
