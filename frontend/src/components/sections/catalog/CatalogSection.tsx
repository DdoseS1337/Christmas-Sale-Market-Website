import { useSearchParams } from "react-router-dom";
import { Section } from "../../common/Section";
import { Catalog } from "./Catalog";
import { CatalogFilter } from "./CatalogFilter";
import { useFetchData } from "../../../hooks/FetchDataHook";
import christmasTreeApi from "../../../services/christmas-tree.api";
import { MultiRange } from "../../../interfaces/MultiRange";
import { IFilterPageData } from "../../../interfaces/FilterPage";

export const CatalogSection = () => {
	const [queryParameters, setQueryParameters] = useSearchParams();

	const categoryId = Number(queryParameters.get("categoryId"));
	const available =
		queryParameters.has("available") === false
			? undefined
			: queryParameters.get("available") === "true";
	const priceRange: MultiRange = {
		min: Number(queryParameters.get("priceMin")),
		max: Number(queryParameters.get("priceMax")),
	};

	const { items: filterData } = useFetchData<IFilterPageData>({
		callApi: () =>
			christmasTreeApi.getCategoryWithOffersForFilterPage(
				categoryId,
				available,
				priceRange
			),
		dependencies: [queryParameters],
	});

	return (
		<Section width="1600px">
			<div className="mx-auto">
				<div className="d-flex align-items-start">
					{filterData && (
						<CatalogFilter
							setQueryParameters={setQueryParameters}
							categories={filterData.generalCategories}
							selectedCategoryId={categoryId}
							priceRange={filterData.priceRange}
						/>
					)}
					<Catalog
						categoryName={filterData?.selectedCategory?.name}
						offers={filterData?.offers}
					/>
				</div>
			</div>
		</Section>
	);
};
