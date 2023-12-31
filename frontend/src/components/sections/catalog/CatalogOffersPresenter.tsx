import "../../../styles/components/sections/catalog/catalog.css";
import { ProductCard } from "../../common/ProductCard";
import { IFilterPageData } from "../../../interfaces/FilterPage";
import { CatalogPagination } from "./CatalogPagination";
import { List, XLg } from "react-bootstrap-icons";
import { CatalogFilter } from "./CatalogFilter";
import { classNames } from "primereact/utils";
import { Dispatch, SetStateAction } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FILTER_CONST } from "../../../common";

interface IProps extends IFilterPageData {
	mobileFilterIsOpenedState: [boolean, Dispatch<SetStateAction<boolean>>];
}

export const CatalogOffersPresenter = ({
	selectedCategory,
	offers,
	pagination,
	mobileFilterIsOpenedState: mobileFilterIsOpened,
	...otherFilterData
}: IProps) => {
	const offersIsEmpty = offers?.length === 0;
	const [filterIsOpened, setFilterIsOpened] = mobileFilterIsOpened;

	const [queryParameters, setQueryParameters] = useSearchParams();
	const searchingName = queryParameters.get(
		FILTER_CONST.QUERY_PARAMETERS.SEARCH
	);

	return (
		<div className="catalog__content">
			<div className="catalog__header">
				<h1 className="catalog__title">
					{searchingName
						? "Пошук: " + searchingName
						: selectedCategory?.name ?? "Усі товари"}
				</h1>
				<List
					size={35}
					onClick={toggleMobileFilter}
					className="catalog__mobile-filter-button"
				/>
			</div>
			{offersIsEmpty ? (
				<span className="catalog__not-found">Товарів не знайдено</span>
			) : (
				<>
					{searchingName && (
						<div
							className="catalog__back-to-all"
							onClick={() => {
								setQueryParameters((old) => {
									old.delete(
										FILTER_CONST.QUERY_PARAMETERS.SEARCH
									);
									return old;
								});
							}}
						>
							Повернутись до всіх товарів
						</div>
					)}
					<div className="catalog__offers">
						{offers?.map((offer) => {
							return (
								<ProductCard
									key={offer.id}
									className="catalog__product"
									{...offer}
									picture={offer.picture[0]}
								/>
							);
						})}
					</div>
					<CatalogPagination pagination={pagination} />
				</>
			)}
			<div
				className={classNames("catalog__filter-mobile-wrapper", {
					"catalog__filter-mobile-wrapper--opened": filterIsOpened,
				})}
			>
				<CatalogFilter
					{...otherFilterData}
					radioUniqueKey="mobile"
					pagination={pagination}
					selectedCategoryId={selectedCategory?.id}
					categories={otherFilterData.categoriesForFilter}
					className={classNames({
						"catalog__filter--mobile": filterIsOpened,
					})}
				/>
				<XLg
					size={35}
					className="catalog__filter-close-button"
					onClick={toggleMobileFilter}
				/>
			</div>
		</div>
	);

	function toggleMobileFilter() {
		setFilterIsOpened((preventFilterIsOpened) => !preventFilterIsOpened);
	}
};
