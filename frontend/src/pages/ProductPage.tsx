import { useState, Dispatch, SetStateAction, useEffect } from "react";
import christmasTreeApi from "../services/christmas-tree.api";
import { useLocation, useSearchParams } from "react-router-dom";
import { IOffer } from "../interfaces/Offer";
import AnimatedEmptyPage from "../components/ui/AnimatedEmptyPage";

interface IProps {
    setAdditionalBreadCrumbs: Dispatch<SetStateAction<any>>;
}

const ProductPage = ({ setAdditionalBreadCrumbs }: IProps) => {
    const location = useLocation();
    const [queryParameters] = useSearchParams();
    const [product, setProduct] = useState<IOffer | null>(null);
    const pathnames = location.pathname.split("/").filter((x) => x);

    useEffect(() => {
        if (pathnames[pathnames.length - 1] !== null) {
            christmasTreeApi
                .getOfferById(pathnames[pathnames.length - 1])
                .then((offer: IOffer) => {
                    setAdditionalBreadCrumbs(offer);
                    setProduct(offer);
                })
                .catch((error) => {
                    setAdditionalBreadCrumbs({
                        id: pathnames[pathnames.length - 1],
                        name: "Сторінку не знайдено",
                    });
                    console.error(
                        "Product with current id not found. " + error
                    );
                });
        }
    }, [queryParameters, setAdditionalBreadCrumbs]);

    return product !== null ? (
        <div></div>
    ) : (
        <AnimatedEmptyPage
            link="/catalog"
            title="Товар не знайдено"
            description="Неправильно набрано адресу або такої сторінки на сайті більше не існує."
            buttonTitle="Повернутись до каталогу"
        />
    );
};

export default ProductPage;
