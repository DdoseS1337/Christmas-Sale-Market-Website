import "../../../styles/components/sections/catalog/catalog.css";
import { IOffer } from "../../../interfaces/Offer";
import { ProductCard } from "../../common/ProductCard";
import { IFilterPagination } from "../../../interfaces/FilterPage";
import { SetURLSearchParams } from "react-router-dom";
import { CatalogPagination } from "./CatalogPagination";

interface IProps {
	setQueryParameters: SetURLSearchParams;
	categoryName?: string;
	offers?: Array<IOffer>;
	pagination?: IFilterPagination;
}

export const CatalogOffersPresenter = ({
	setQueryParameters,
	categoryName,
	offers,
	pagination,
}: IProps) => {
	const offersIsEmpty = offers?.length === 0;

	return (
		<div className="catalog">
			<h1 className="catalog__title">{categoryName}</h1>
			{offersIsEmpty ? (
				<span className="catalog__not-found">Товарів не знайдено</span>
			) : (
				<>
					<div className="catalog__offers mb-2">
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
					<CatalogPagination
						setQueryParameters={setQueryParameters}
						pagination={pagination}
					/>
				</>
			)}
		</div>
	);
};
