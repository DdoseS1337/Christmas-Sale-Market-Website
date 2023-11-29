import { ArrowRight } from "react-bootstrap-icons";
import { ProductCard } from "./ProductCard";
import { IOffer } from "../../interfaces/Offer";
import { useNavigate } from "react-router-dom";
import { ICategory } from "../../interfaces/Category";
import "animate.css";

interface IProps {
	customTitle?: string;
	category: ICategory;
	offers: Array<IOffer>;
}

export const RowProductPresenter = ({
	customTitle,
	category,
	offers,
}: IProps) => {
	const navigate = useNavigate();

	const handleCategoryClick = (categoryId: any) => {
		navigate(`/catalog?categoryId=${categoryId}`);
		window.scroll(0, 0);
	};

	return (
		<div className="products-of-category animate__animated animate__fadeIn">
			<div className="products-of-category__header">
				<h2 className="products-of-category__title">
					{customTitle ?? category.name}
				</h2>
				<div
					className="products-of-category__view-all fw-bold"
					onClick={() => handleCategoryClick(category.id)}
				>
					Переглянути всі <ArrowRight className="ms-1" />
				</div>
			</div>
			<div className="products-of-category__cards hot-product__scroll-container">
				{offers?.map((offer) => {
					return (
						<ProductCard
							key={offer.id}
							{...offer}
							picture={offer.picture[0]}
						/>
					);
				})}
			</div>
		</div>
	);
};
