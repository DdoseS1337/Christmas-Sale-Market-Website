import { ArrowRight } from "react-bootstrap-icons";
import { ProductCard } from "../../common/ProductCard";
import { IOffer } from "../../../interfaces/Offer";
import { useNavigate } from "react-router-dom";
import { ICategory } from "../../../interfaces/Category";

interface IProps {
	category: ICategory;
	offers: Array<IOffer>;
}

export const RowProductPresenter = ({ category, offers }: IProps) => {
	const navigate = useNavigate();

	const handleCategoryClick = (categoryId: any) => {
		navigate(`/catalog?categoryId=${categoryId}&priceMin=0&priceMax=20000`);
	};

	return (
		<div className="products-of-category">
			<div className="products-of-category__header">
				<h2 className="products-of-category__title">{category.name}</h2>
				<div
					className="products-of-category__view-all"
					onClick={() => handleCategoryClick(category.id)}
				>
					View All <ArrowRight className="ms-1" />
				</div>
			</div>
			<div className="products-of-category__cards hot-product__scroll-container">
				{offers?.map((offer) => {
					return (
						<ProductCard
							key={offer.id}
							id={offer.id}
							name={offer.name}
							newPrice={offer.newPrice}
							price={offer.price}
							picture={offer.picture[0]}
						/>
					);
				})}
			</div>
		</div>
	);
};
