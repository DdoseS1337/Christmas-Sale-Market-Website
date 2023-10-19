import { ArrowRight } from "react-bootstrap-icons";
import { ProductCard } from "../../common/ProductCard";

interface IProps {
	categoryId: number;
	categoryTitle: string;
}

export const HotProductOfCategory = ({ categoryId, categoryTitle }: IProps) => {
	return (
		<div className="products-of-category">
			<div className="products-of-category__header">
				<h2 className="products-of-category__title">{categoryTitle}</h2>
				<span className="products-of-category__view-all">
					View All <ArrowRight />
				</span>
			</div>
			<div className="products-of-category__cards">
				<ProductCard
					link={"#"}
					id={"1"}
					title={"Green Apple"}
					actualPrice={14.99}
					oldPrice={20}
					image={"/images/product-images/image1.png"}
				/>
				<ProductCard
					link={"#"}
					id={"2"}
					title={"Fresh Indian Malta"}
					actualPrice={20}
					image={"/images/product-images/image1.png"}
				/>
				<ProductCard
					link={"#"}
					id={"3"}
					title={"Chinese cabbage"}
					actualPrice={12}
					image={"/images/product-images/image1.png"}
				/>
				<ProductCard
					link={"#"}
					id={"4"}
					title={"Green Lettuce"}
					actualPrice={9}
					image={"/images/product-images/image1.png"}
				/>
				<ProductCard
					link={"#"}
					id={"5"}
					title={"Eggplant"}
					actualPrice={34}
					image={"/images/product-images/image1.png"}
				/>
			</div>
		</div>
	);
};
