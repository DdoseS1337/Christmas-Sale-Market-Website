import { Card } from "react-bootstrap";
import "../../styles/components/common/product-card.css";
import RoundedButton from "./RoundedButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IShortOffer } from "../../interfaces/Offer";
import { CartService } from "../../services/basketService";
import { BagDash, Dash } from "react-bootstrap-icons";
import ConfirmRemoveFromBasketModal from "./ConfirmRemoveFromBasketModal";
import { DeferredContent } from "primereact/deferredcontent";

const addToBasketIcon = <BagDash width={30} />;
const removeFromBasketIcon = <Dash width={30} />;

interface IProps extends IShortOffer {
	className?: string;
}

export const ProductCard = ({
	id,
	name: title,
	newPrice: actualPrice,
	price: oldPrice,
	picture,
	className,
	available,
}: IProps) => {
	const navigate = useNavigate();

	const isInCart = CartService.getCart()
		.map((item) => item.id)
		.includes(id.toString());

	const [modalShow, setModalShow] = useState(false);

	const initialButtonIcon = isInCart ? removeFromBasketIcon : addToBasketIcon;
	const initialButtonCallback = isInCart ? removeFromBasket : addToBasket;

	const [iconOnBasketButton, setIconOnBasketButton] =
		useState(initialButtonIcon);

	const [actualBasketButtonCallback, setActualBasketButtonCallback] =
		useState<() => void>(() => initialButtonCallback);

	let clickedOnBasked = false;
	let discount = oldPrice && (100 * (oldPrice - actualPrice)) / oldPrice;

	return (
		<>
			<Card
				body
				className={"product-card " + className}
				onClick={() => {
					!clickedOnBasked && navigateToProductPage();
					clickedOnBasked = false;
				}}
			>
				<Card.Header>
					{discount ? (
						<div className="product-card__header-item product-card__sale">
							Знижка {discount.toFixed(0)}%
						</div>
					) : undefined}
					{!available ? (
						<div className="product-card__header-item product-card__not-available">
							Не в наявності
						</div>
					) : undefined}
				</Card.Header>
				<DeferredContent>
					<Card.Img
						className="product-card__image"
						src={picture}
						alt="product image"
					/>
				</DeferredContent>
				<Card.Footer>
					<div>
						<Card.Title className="product-card__title">
							{title}
						</Card.Title>
						<div className="product-card__price">
							<div className="product-card__price-actual me-2">
								{actualPrice} грн
							</div>
							{oldPrice && (
								<div className="product-card__price-old">
									{oldPrice} грн
								</div>
							)}
						</div>
					</div>
					{available ? (
						<RoundedButton
							isCircle
							backgroundIsGray
							className="product-card__button z-1"
							onClick={() => {
								clickedOnBasked = true;
								actualBasketButtonCallback &&
									actualBasketButtonCallback();
							}}
						>
							{iconOnBasketButton}
						</RoundedButton>
					) : undefined}
				</Card.Footer>
			</Card>
			<ConfirmRemoveFromBasketModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				onRemove={() => {
					CartService.removeFromCart(String(id));
					setIconOnBasketButton(addToBasketIcon);
					setActualBasketButtonCallback(() => addToBasket);
					setModalShow(false);
				}}
			/>
		</>
	);

	function addToBasket() {
		CartService.loadCart();
		CartService.addToCart({
			id: String(id),
			name: title,
			newPrice: actualPrice,
			picture: [picture],
			amount: 1,
		});

		setIconOnBasketButton(removeFromBasketIcon);
		setActualBasketButtonCallback(() => removeFromBasket);
	}

	function removeFromBasket() {
		setModalShow(true);
	}

	function navigateToProductPage() {
		navigate(`/catalog/${id}`);
		window.scroll(0, 0);
	}
};
