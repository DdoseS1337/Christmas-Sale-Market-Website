import { ArrowRight } from "react-bootstrap-icons";
import { ProductCard } from "../../common/ProductCard";
import { IOffer } from "../../../interfaces/Offer";
import christmasTreeApi from "../../../services/christmas-tree.api";
import { useFetchData } from "../../../hooks/FetchDataHook";

interface IProps {
	categoryId: number;
	categoryTitle: string;
}

export const ProductsRow = ({ categoryId, categoryTitle }: IProps) => {
	const { items: offers } = useFetchData<IOffer[]>({
		callApi: () => christmasTreeApi.getOffersByCategoryId(categoryId, true),
		count: 5,
	});

	return (
		<div className="products-of-category">
			<div className="products-of-category__header">
				<h2 className="products-of-category__title">{categoryTitle}</h2>
				<a className="products-of-category__view-all" href="#">
					View All <ArrowRight className="ms-1" />
				</a>
			</div>
			<div className="products-of-category__cards hot-product__scroll-container">
				{offers?.map((offer) => {
					return (
						<ProductCard
							key={offer._id}
							id={offer._id}
							title={offer.name}
							actualPrice={offer.newPrice}
							oldPrice={offer.price}
							image={offer.picture[0]}
						/>
					);
				})}
			</div>
		</div>
	);
};
