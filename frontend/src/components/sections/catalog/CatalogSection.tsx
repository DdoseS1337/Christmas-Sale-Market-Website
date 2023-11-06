import { useSearchParams } from "react-router-dom";
import { Section } from "../../common/Section";
import { CatalogOffersPresenter } from "./CatelogOffersPresenter";
import { CatalogFilter } from "./CatalogFilter";
import { useFetchData } from "../../../hooks/FetchDataHook";
import christmasTreeApi from "../../../services/christmas-tree.api";
import { MultiRange } from "../../../interfaces/MultiRange";
import { IFilterPageData } from "../../../interfaces/FilterPage";
import { Pagination } from "react-bootstrap";

export const CatalogSection = () => {
	const [queryParameters, setQueryParameters] = useSearchParams();

	const categoryId = queryParameters.has("categoryId")
		? Number(queryParameters.get("categoryId"))
		: undefined;
	const available =
		queryParameters.has("available") === false
			? undefined
			: queryParameters.get("available") === "true";
	const priceRange: MultiRange = {
		min: Number(queryParameters.get("priceMin")),
		max: Number(queryParameters.get("priceMax")),
	};
	const page = Number(queryParameters.get("page"));

	const { items: filterData } = useFetchData<IFilterPageData>({
		callApi: () =>
			christmasTreeApi.getCategoryWithOffersForFilterPage(
				page,
				categoryId,
				available,
				priceRange
			),
		dependencies: [queryParameters],
	});

	return (
		<Section width="1600px" style={{ marginTop: "-3rem" }}>
			<div className="mx-auto">
				<div className="d-flex align-items-start">
					{filterData && (
						<CatalogFilter
							setQueryParameters={setQueryParameters}
							categories={filterData.categoriesForFilter}
							selectedCategoryId={categoryId}
							priceRange={filterData.priceRange}
							pagination={filterData?.pagination}
						/>
					)}
					<CatalogOffersPresenter
						setQueryParameters={setQueryParameters}
						categoryName={filterData?.selectedCategory?.name}
						offers={filterData?.offers}
						pagination={filterData?.pagination}
					/>
				</div>
			</div>
		</Section>
	);
};
