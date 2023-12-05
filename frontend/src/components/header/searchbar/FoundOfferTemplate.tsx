import { IOffer } from "../../../interfaces/Offer";
import InStockBlock from "../../sections/product/InStockBlock";

interface IProps extends IOffer {
	onClick: () => void;
}

export const FoundOfferTemplate = ({ onClick, ...offer }: IProps) => {
	return (
		<div
			className="found-offer d-flex gap-3 link-settings text-black align-items-center"
			onClick={() => {
				window.scroll(0, 0);
				onClick();
			}}
		>
			<img
				className="rounded border border-0"
				style={{ width: "5rem" }}
				src={offer.picture[0]}
				alt={offer.name}
			/>
			<div className="d-flex flex-column">
				<span>{offer.name}</span>
				<div>
					<span className="found-offer__price">
						Вартість:
						<span className="text-decoration-line-through ms-2 me-2">
							{offer.price}₴
						</span>
						{offer.newPrice}₴
					</span>
					<InStockBlock available={offer.available} />
				</div>
			</div>
		</div>
	);
};
