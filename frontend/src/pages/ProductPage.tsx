import { Dispatch, SetStateAction, useEffect } from "react";
import christmasTreeApi from "../services/christmas-tree.api";
import { useLocation, useSearchParams } from "react-router-dom";

interface IProps {
    setAdditionalBreadCrumbs: Dispatch<SetStateAction<any>>;
}

const ProductPage = ({ setAdditionalBreadCrumbs }: IProps) => {
    const [queryParameters] = useSearchParams();
    const location = useLocation();
    let pathnames = location.pathname.split("/").filter((x) => x);

    useEffect(() => {
        if (pathnames[pathnames.length - 1] !== null) {
            christmasTreeApi
                .getOfferById(pathnames[pathnames.length - 1])
                .then((offer) => {
                    setAdditionalBreadCrumbs(offer);
                });
        }
    }, [queryParameters]);

    return (
        <div></div>
    );
};

export default ProductPage;
