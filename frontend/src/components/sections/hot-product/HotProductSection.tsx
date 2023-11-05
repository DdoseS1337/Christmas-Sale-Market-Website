import { Section } from "../../common/Section";
import { ProductsRow } from "./ProductsRow";
import "../../../styles/components/sections/hot-product/hot-product.css";
import { useFetchData } from "../../../hooks/FetchDataHook";
import christmasTreeApi from "../../../services/christmas-tree.api";
import { ICategory } from "../../../interfaces/Category";

export const HotProductSection = () => {
	const { items: categories } = useFetchData<ICategory[]>({
		callApi: () => christmasTreeApi.getAllCategories(),
		filter: async (category: ICategory) => {
			const offers = await christmasTreeApi.getOffersByCategoryId(
				category.id,
				true
			);
			return offers.length != 0;
		},
		count: 3,
	});

	return (
		<Section className="hot-product" width="1510px">
			{categories?.map((category: ICategory) => {
				return <ProductsRow key={category.id} {...category} />;
			})}
		</Section>
	);
};
