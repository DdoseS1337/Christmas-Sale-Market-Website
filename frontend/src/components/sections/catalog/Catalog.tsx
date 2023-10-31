import "../../../styles/components/sections/catalog/catalog.css";
import { useFetchData } from "../../../hooks/FetchDataHook";
import christmasTreeApi from "../../../services/christmas-tree.api";
import { IOffer } from "../../../interfaces/Offer";
import { ProductCard } from "../../common/ProductCard";

interface IProps {
	category: any;
}

export const Catalog = ({ category }: IProps) => {
	const { items: offers } = useFetchData<IOffer[]>({
		callApi: () =>
			christmasTreeApi.getOffersByCategoryId(category.id, true),
		count: 20,
		dependencies: [category],
	});

	return (
		<div className="catalog">
			<h1>{category.name}</h1>
			<div className="catalog__offers">
				{offers?.map((offer) => {
					return (
						<ProductCard
							key={offer._id}
							className="catalog__product"
							id={offer._id}
							title={offer.name}
							actualPrice={offer.price}
							image={offer.picture[0]}
						/>
					);
				})}
			</div>
		</div>
	);
};
