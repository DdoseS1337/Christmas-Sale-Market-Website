import "../../../styles/components/sections/present-section/featured.css";
import { FeaturedItem } from "./FeaturedItem";
import { Basket, Truck, Headset } from "react-bootstrap-icons";

export const Featured = () => {
    return (
        <div className="featured">
            <FeaturedItem
                icon={<Headset />}
                title="Підтримка клієнтів 24/7"
                description="Миттєвий доступ до служби підтримки"
            />
            <FeaturedItem
                icon={<Basket />}
                title="Оплата при отримані"
                description="Ми гарантуємо, що ваші гроші будуть в безпеці"
            />
            <FeaturedItem
                icon={<Truck />}
                title="Швидка доставка"
                description="Відправлення здійснюємо у день замовлення!"
            />
            <img
                className="featured__snowman"
                src="/images/pictures/snowman.png"
                alt="snowman"
            />
        </div>
    );
};
