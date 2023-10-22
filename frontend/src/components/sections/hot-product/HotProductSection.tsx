import { Section } from "../../common/Section";
import { ProductsRow } from "./ProductsRow";
import "../../../styles/components/sections/hot-product/hot-product.css";
import { useFetchData } from "../../../hooks/FetchDataHook";
import christmasTreeApi from "../../../services/christmas-tree.api";

export const HotProductSection = () => {
	const { items: categories } = useFetchData<any[]>({
		callApi: () =>
			Promise.all([
				christmasTreeApi.getCategoryById("6532ab16303b9d888555f5db"),
				christmasTreeApi.getCategoryById("6532ab16303b9d888555f5de"),
				christmasTreeApi.getCategoryById("6532ab16303b9d888555f5e0"),
			]).then((result) => {
				return result.flatMap((item) => item);
			}),
	});

	return (
		<Section className="hot-product" width="1510px">
			{categories?.map((category: any) => {
				return (
					<ProductsRow
						key={category.id}
						categoryId={category.id}
						categoryTitle={category.name}
					/>
				);
			})}
		</Section>
	);
};
