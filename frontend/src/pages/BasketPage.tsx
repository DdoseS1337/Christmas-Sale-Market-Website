import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import BasketItems from "../components/sections/basket/BasketItems";
import AnimatedEmptyPage from "../components/ui/AnimatedEmptyPage";
import "../styles/components/basket.css";

const BasketPage = () => {
    function useLocalStorageExists(key: any) {
        const [localStorageExists, setLocalStorageExists] = useState(
            !!localStorage.getItem(key) && localStorage.getItem(key) != "[]"
        );

        useEffect(() => {
            const storageChangeHandler = () => {
                setLocalStorageExists(
                    !!localStorage.getItem(key) &&
                        localStorage.getItem(key) != "[]"
                );
            };

            window.addEventListener("storage", storageChangeHandler);
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
        <AnimatedEmptyPage
            link="/catalog"
            title="Ваш кошик порожній"
            description="Але це ніколи не пізно виправити!"
            buttonTitle="Повернутись до каталогу"
        />
    );
};

export default BasketPage;
