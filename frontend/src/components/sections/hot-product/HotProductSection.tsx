import { Section } from "../../common/Section";
import { ProductsRow } from "./ProductsRow";
import "../../../styles/components/sections/hot-product/hot-product.css";
import { useFetchData } from "../../../hooks/FetchDataHook";
import christmasTreeApi from "../../../services/christmas-tree.api";

export const HotProductSection = () => {
    const { items: categories } = useFetchData<any[]>({
        callApi: () =>
            Promise.all([
                christmasTreeApi.getCategoryById("653fa7d5c5703a21db6d7c02"),
                christmasTreeApi.getCategoryById("653fa7d5c5703a21db6d7c02"),
                christmasTreeApi.getCategoryById("653fa7d5c5703a21db6d7c04"),
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
