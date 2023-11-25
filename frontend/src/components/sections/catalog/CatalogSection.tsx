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

export const CatalogSection = () => {
	const [queryParameters] = useSearchParams();

	const {
		page,
		categoryId,
		available,
		priceRange,
		sorting,
	}: {
		page: number;
		categoryId: number | undefined;
		available: boolean | undefined;
		priceRange: MultiRange;
		sorting: boolean | undefined;
	} = getParametersFromURL();

	const { items: filterData } = useFetchData<IFilterPageData>({
		callApi: () =>
			christmasTreeApi.getCategoryWithOffersForFilterPage(
				page,
				categoryId,
				available,
				priceRange,
				sorting
			),
		dependencies: [queryParameters],
	});

	return (
		<Section width="1550px" style={{ marginTop: "-3rem", zIndex: "10" }}>
			{filterData ? (
				<div className="catalog animate__animated animate__fadeIn">
					<div className="catalog__inner">
						<CatalogFilter
							categories={filterData.categoriesForFilter}
							selectedCategoryId={categoryId}
							priceRange={filterData.priceRange}
							pagination={filterData?.pagination}
							className="catalog-filter--side"
						/>
						<CatalogOffersPresenter {...filterData} />
					</div>
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
			queryParameters.has(FILTER_CONST.QUERY_PARAMETERS.SORTING) === false
				? undefined
				: queryParameters.get(FILTER_CONST.QUERY_PARAMETERS.SORTING) ===
				  FILTER_CONST.SORTING_VALUES.ABC;

		return { page, categoryId, available, priceRange, sorting };
	}
};
