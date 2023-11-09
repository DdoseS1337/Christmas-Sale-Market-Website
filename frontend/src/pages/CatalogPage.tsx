import { Dispatch, SetStateAction, useEffect } from "react";
import { CatalogSection } from "../components/sections/catalog/CatalogSection";
import { useSearchParams } from "react-router-dom";
import christmasTreeApi from "../services/christmas-tree.api";

interface IProps {
    setAdditionalBreadCrumbs: Dispatch<SetStateAction<any>>;
}

const CatalogPage = ({ setAdditionalBreadCrumbs }: IProps) => {
    const [queryParameters] = useSearchParams();

    useEffect(() => {
        const categoryId = queryParameters.get("categoryId");
        if (categoryId !== null) {
            christmasTreeApi.getCategoryById(categoryId).then((category) => {
                setAdditionalBreadCrumbs(category);
            });
        }
    }, [queryParameters]);

    return (
        <div>
            <CatalogSection />
        </div>
    );
};

export default CatalogPage;
