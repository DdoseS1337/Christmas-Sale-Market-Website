import { Card } from "react-bootstrap";
import { BagDash, Dash } from "react-bootstrap-icons";
import "../../styles/components/common/product-card.css";
import RoundedButton from "./RoundedButton";
import { Link, To } from "react-router-dom";
import { useRef, useState } from "react";
import { IShortProductInfo } from "../../interfaces/Product";

interface IProps extends IShortProductInfo {
	link: To;
	className?: string;
}

export const ProductCard = ({
	id,
	title,
	actualPrice,
	oldPrice,
	image,
	link,
	className,
}: IProps) => {
	const linkRef = useRef<HTMLAnchorElement>(null);

	const addToBasketIcon = <BagDash style={{ width: 20, height: 20 }} />;
	const removeFromBasketIcon = <Dash style={{ width: 20, height: 20 }} />;

	const [iconOnBasketButton, setIconOnBasketButton] =
		useState(addToBasketIcon);

	const addToBasket = () => {
		// use id here
		// logic of adding a product to the basket
		setIconOnBasketButton(removeFromBasketIcon);
		setActualBasketButtonCallback(() => removeFromBasket);
	};

	const removeFromBasket = () => {
		// use id here
		// logic of adding a product to the basket
		setIconOnBasketButton(addToBasketIcon);
		setActualBasketButtonCallback(() => addToBasket);
	};

	const [actualBasketButtonCallback, setActualBasketButtonCallback] =
		useState<() => void>(() => addToBasket);

	let clickedOnBasked = false;
	let discount =
		oldPrice && Math.abs((actualPrice - oldPrice) / actualPrice) * 100;

	return (
		<Card
			body
			className={"product-card " + className}
			onClick={() => {
				!clickedOnBasked && linkRef.current?.click();
				clickedOnBasked = false;
			}}
		>
			{discount && (
				<Card.Header>
					<div className="product-card__sale">
						Знижка {discount.toFixed(0)}%
					</div>
				</Card.Header>
			)}
			<Card.Img
				className="product-card__image"
				src={image}
				alt="product image"
			/>
			<Card.Footer>
				<div>
					<Card.Title className="product-card__title">
						<Link to={link} ref={linkRef}>
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
};
