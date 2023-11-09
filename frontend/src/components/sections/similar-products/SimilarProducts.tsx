import { Spinner } from "react-bootstrap";
import { useFetchData } from "../../../hooks/FetchDataHook";
import { ICategory } from "../../../interfaces/Category";
import { IOffer } from "../../../interfaces/Offer";
import christmasTreeApi from "../../../services/christmas-tree.api";
import { Section } from "../../common/Section";
import { RowProductPresenter } from "../../common/ProductsRowPresenter";
import { CartService } from "../../../services/basketService";
import "animate.css";
import { SIMILAR_PRODUCTS } from "../../../common";

interface IProps {
	categoryId: number;
}

export const SimilarProducts = ({ categoryId }: IProps) => {
	const { items: category } = useFetchData<ICategory>({
		callApi: () => christmasTreeApi.getCategoryById(categoryId.toString()),
	});

	const { items: offers } = useFetchData<Array<IOffer>>({
		callApi: () => christmasTreeApi.getOffersByCategoryId(categoryId),
		filter: (offer: IOffer) => {
			const isInCart = CartService.getCart()
				.map((cartItem) => cartItem.id)
				.includes(offer.id.toString());
			return offer.available === true && !isInCart;
		},
		count: SIMILAR_PRODUCTS.ROW_LENGTH,
	});

	return (
		<Section>
			{category && offers ? (
				<RowProductPresenter
					customTitle="Схожі товари"
					category={category}
					offers={offers}
				/>
			) : (
				<div className="d-flex justify-content-center">
					<Spinner />
				</div>
			)}
		</Section>
	);
};
