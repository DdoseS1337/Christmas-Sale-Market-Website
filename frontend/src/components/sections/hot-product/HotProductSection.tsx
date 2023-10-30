import { Section } from "../../common/Section";
import { ProductsRow } from "./ProductsRow";
import "../../../styles/components/sections/hot-product/hot-product.css";
import { useFetchData } from "../../../hooks/FetchDataHook";
import christmasTreeApi from "../../../services/christmas-tree.api";

export const HotProductSection = () => {
    const { items: categories } = useFetchData<any[]>({
        callApi: () =>
            Promise.all([
                christmasTreeApi.getCategoryById("653fb05b52c6711066d589cf"),
                christmasTreeApi.getCategoryById("653fb05b52c6711066d589d5"),
                christmasTreeApi.getCategoryById("653fb05b52c6711066d589da"),
            ]).then((result) => {
                return result.flatMap((item) => item);
            }),
    });

    return (
        <Section className="hot-product" width="1510px">
            {categories?.map((category: any) => {
                return (
                    <ProductsRow
                        key={category._id}
                        categoryId={category._id}
                        categoryTitle={category.name}
                    />
                );
            })}
        </Section>
    );
};
