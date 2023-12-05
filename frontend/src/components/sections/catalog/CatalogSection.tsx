import { useSearchParams } from "react-router-dom";
import { Section } from "../../common/Section";
import { CatalogOffersPresenter } from "./CatalogOffersPresenter";
import { CatalogFilter } from "./CatalogFilter";
import { useFetchData } from "../../../hooks/FetchDataHook";
import christmasTreeApi from "../../../services/christmas-tree.api";
import { MultiRange } from "../../../interfaces/MultiRange";
import { IFilterPageData } from "../../../interfaces/FilterPage";
import { FILTER_CONST } from "../../../common";
import { Spinner } from "react-bootstrap";
import "animate.css";
import { classNames } from "primereact/utils";
import { useState } from "react";

export const CatalogSection = () => {
	const [queryParameters] = useSearchParams();
	const [mobileFilterIsOpened, setMobileFilterIsOpened] =
		useState<boolean>(false);

	const { page, categoryId, available, priceRange, sorting, search } =
		getParametersFromURL();

	const { items: filterData } = useFetchData<IFilterPageData>({
		callApi: () =>
			christmasTreeApi.getCategoryWithOffersForFilterPage(
				page,
				categoryId,
				available,
				priceRange,
				sorting,
				search
			),
		dependencies: [queryParameters],
	});

	return (
		<Section
			className={classNames("catalog", {
				catalog__biggestZIndex: mobileFilterIsOpened,
			})}
			width="1550px"
		>
			{filterData ? (
				<div className="catalog__inner animate__animated animate__fadeIn">
					<CatalogFilter
						radioUniqueKey="side"
						categories={filterData.categoriesForFilter}
						selectedCategoryId={categoryId}
						priceRange={filterData.priceRange}
						pagination={filterData.pagination}
						className="catalog-filter--side"
					/>
					<CatalogOffersPresenter
						{...filterData}
						mobileFilterIsOpenedState={[
							mobileFilterIsOpened,
							setMobileFilterIsOpened,
						]}
					/>
				</div>
			) : (
				<div className="catalog__spinner-wrapper animate__animated animate__animated">
					<Spinner className="catalog__spinner" />
				</div>
			)}
		</Section>
	);

	function getParametersFromURL() {
		// Prettier cracked down on line breaks :)

		const categoryId = queryParameters.has(
			FILTER_CONST.QUERY_PARAMETERS.CATEGORY_ID
		)
			? Number(
					queryParameters.get(
						FILTER_CONST.QUERY_PARAMETERS.CATEGORY_ID
					)
			  )
			: undefined;

		const available =
			queryParameters.has(FILTER_CONST.QUERY_PARAMETERS.AVAILABLE) ===
			false
				? undefined
				: queryParameters.get(
						FILTER_CONST.QUERY_PARAMETERS.AVAILABLE
				  ) === "true";

		const priceRange: MultiRange = {
			min: Number(
				queryParameters.get(FILTER_CONST.QUERY_PARAMETERS.PRICE_MIN)
			),
			max: Number(
				queryParameters.get(FILTER_CONST.QUERY_PARAMETERS.PRICE_MAX)
			),
		};

		const page = Number(
			queryParameters.get(FILTER_CONST.QUERY_PARAMETERS.PAGE)
		);

		const sorting =
			queryParameters.get(FILTER_CONST.QUERY_PARAMETERS.SORTING) ??
			undefined;

		const search = queryParameters.has(FILTER_CONST.QUERY_PARAMETERS.SEARCH)
			? queryParameters.get(FILTER_CONST.QUERY_PARAMETERS.SEARCH)!
			: undefined;

		return { page, categoryId, available, priceRange, sorting, search };
	}
};
