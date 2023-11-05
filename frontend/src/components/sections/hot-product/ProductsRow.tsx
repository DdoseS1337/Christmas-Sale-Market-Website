import { ArrowRight } from "react-bootstrap-icons";
import { ProductCard } from "../../common/ProductCard";
import { IOffer } from "../../../interfaces/Offer";
import christmasTreeApi from "../../../services/christmas-tree.api";
import { useFetchData } from "../../../hooks/FetchDataHook";
import { ICategory } from "../../../interfaces/Category";

interface IProps extends Omit<ICategory, "parentId"> {}

export const ProductsRow = ({ id: categoryId, name: categoryName }: IProps) => {
	const { items: offers } = useFetchData<IOffer[]>({
		callApi: () => christmasTreeApi.getOffersByCategoryId(categoryId, true),
		count: 5,
	});

	return (
		<div className="products-of-category">
			<div className="products-of-category__header">
				<h2 className="products-of-category__title">{categoryName}</h2>
				<a className="products-of-category__view-all" href="#">
					View All <ArrowRight className="ms-1" />
				</a>
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
