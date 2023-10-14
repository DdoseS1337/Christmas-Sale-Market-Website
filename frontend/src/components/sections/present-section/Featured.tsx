import "../../../styles/components/sections/present-section/featured.css";
import { FeaturedItem } from "./FeaturedItem";
import { Basket, Box, Headphones } from "react-bootstrap-icons";

export const Featured = () => {
	return (
		<div className="featured">
			<FeaturedItem
				icon={<Headphones />}
				title="Підтримка клієнтів 24/7"
				description="Миттєвий доступ до служби підтримки"
			/>
			<FeaturedItem
				icon={<Basket />}
				title="Оплата при отримані"
				description="Ми гарантуємо, що ваші гроші будуть в безпеці"
			/>
			<FeaturedItem
				icon={<Box />}
				title="Тут щось буде"
				description="30 Days Money-Back Guarantee"
			/>
			<img
				className="featured__snowman"
				src="/images/pictures/snowman.png"
				alt="snowman"
			/>
		</div>
	);
};
