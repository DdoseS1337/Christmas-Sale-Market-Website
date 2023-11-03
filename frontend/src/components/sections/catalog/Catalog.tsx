import "../../../styles/components/sections/catalog/catalog.css";
import { IOffer } from "../../../interfaces/Offer";
import { ProductCard } from "../../common/ProductCard";

interface IProps {
	categoryName?: string;
	offers?: Array<IOffer>;
}

export const Catalog = ({ categoryName, offers }: IProps) => {
	const offersIsEmpty = offers?.length === 0;

	return (
		<div className="catalog">
			<h1 className="catalog__title">{categoryName}</h1>
			{offersIsEmpty ? (
				<span className="catalog__not-found">Товарів не знайдено</span>
			) : (
				<OffersPresenter offers={offers} />
			)}
		</div>
	);
};

const OffersPresenter = ({ offers }: { offers?: Array<IOffer> }) => {
	return (
		<div className="catalog__offers">
			{offers?.map((offer) => {
				return (
					<ProductCard
						key={offer.id}
						className="catalog__product"
						id={offer.id}
						name={offer.name}
						newPrice={offer.newPrice}
						price={offer.price}
						picture={offer.picture[0]}
					/>
				);
			})}
		</div>
	);
};
