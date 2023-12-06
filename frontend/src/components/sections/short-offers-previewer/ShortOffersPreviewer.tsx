import { Section } from "../../common/Section";
import { RowProductPresenter } from "../../common/ProductsRowPresenter";
import "../../../styles/components/sections/hot-product/hot-product.css";
import { useFetchData } from "../../../hooks/FetchDataHook";
import christmasTreeApi from "../../../services/christmas-tree.api";
import { ICategoryWithOffers } from "../../../interfaces/Category";
import LoadingSpinner from "../../common/LoadingSpinner";

export const ShortOffersPreviewer = () => {
	const { items: categoriesWithOffers } = useFetchData<
		Array<ICategoryWithOffers>
	>({
		callApi: () => christmasTreeApi.getCategoriesWithOffers(3, 5),
	});

	return (
		<Section className="hot-product" width="1510px">
			{categoriesWithOffers ? (
				categoriesWithOffers.map(
					(categoryWithOffers: ICategoryWithOffers) => {
						return (
							<RowProductPresenter
								key={categoryWithOffers.category.id}
								category={categoryWithOffers.category}
								offers={categoryWithOffers.offers}
							/>
						);
					}
				)
			) : (
				<LoadingSpinner variant="danger" />
			)}
		</Section>
	);
};
