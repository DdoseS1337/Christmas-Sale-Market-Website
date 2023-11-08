import { Card } from "react-bootstrap";
import "../../styles/components/common/product-card.css";
import RoundedButton from "./RoundedButton";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { IShortOffer } from "../../interfaces/Offer";
import { CartService } from "../../services/basketService";
import { BagDash, Dash } from "react-bootstrap-icons";

const addToBasketIcon = <BagDash style={{ width: 20, height: 20 }} />;
const removeFromBasketIcon = <Dash style={{ width: 20, height: 20 }} />;

interface IProps extends IShortOffer {
	className?: string;
}

export const ProductCard = ({
	id,
	name: title,
	newPrice: actualPrice,
	price: oldPrice,
	picture: image,
	className,
}: IProps) => {
	const linkRef = useRef<HTMLAnchorElement>(null);

	const isInCart = CartService.getCart()
		.map((item) => item.id)
		.includes(id.toString());

	const initialButtonIcon = isInCart ? removeFromBasketIcon : addToBasketIcon;
	const initialButtonCallback = isInCart ? removeFromBasket : addToBasket;

	const [iconOnBasketButton, setIconOnBasketButton] =
		useState(initialButtonIcon);

	const [actualBasketButtonCallback, setActualBasketButtonCallback] =
		useState<() => void>(() => initialButtonCallback);

	let clickedOnBasked = false;
	let discount = oldPrice && (100 * (oldPrice - actualPrice)) / oldPrice;

	return (
		<Card
			body
			className={"product-card " + className}
			onClick={() => {
				!clickedOnBasked && linkRef.current?.click();
				clickedOnBasked = false;
			}}
		>
			{discount ? (
				<Card.Header>
					<div className="product-card__sale">
						Знижка {discount.toFixed(0)}%
					</div>
				</Card.Header>
			) : undefined}
			<Card.Img
				className="product-card__image"
				src={image}
				alt="product image"
			/>
			<Card.Footer>
				<div>
					<Card.Title className="product-card__title">
						<Link to={`/catalog/${id}`} ref={linkRef}>
							{title}
						</Link>
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
			</Card.Footer>
		</Card>
	);

	function addToBasket() {
		CartService.loadCart();
		CartService.addToCart({
			id: String(id),
			name: title,
			newPrice: actualPrice,
			picture: [image],
			amount: 1,
		});

		setIconOnBasketButton(removeFromBasketIcon);
		setActualBasketButtonCallback(() => removeFromBasket);
	}

	function removeFromBasket() {
		CartService.removeFromCart(String(id));

		setIconOnBasketButton(addToBasketIcon);
		setActualBasketButtonCallback(() => addToBasket);
	}
};
