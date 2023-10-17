import { Card } from "react-bootstrap";
import { BagDash, Dash } from "react-bootstrap-icons";
import "../../styles/components/common/product-card.css";
import RoundedButton from "./RoundedButton";
import { Link, To } from "react-router-dom";
import { useRef, useState } from "react";

interface IProps {
	title: string;
	actualPrice: number;
	oldPrice?: number;
	imagePath: string;
	sale?: string;
	link: To;
}

export const ProductCard = ({
	title,
	actualPrice,
	oldPrice,
	imagePath,
	sale,
	link,
}: IProps) => {
	const linkRef = useRef<HTMLAnchorElement>(null);

	const addToBasketIcon = <BagDash style={{ width: 20, height: 20 }} />;
	const removeFromBasketIcon = <Dash style={{ width: 20, height: 20 }} />;

	const [iconOnBasketButton, setIconOnBasketButton] =
		useState(addToBasketIcon);

	const addToBasket = () => {
		setIconOnBasketButton(removeFromBasketIcon);
		setActualBasketButtonCallback(() => removeFromBasket);
	};

	const removeFromBasket = () => {
		setIconOnBasketButton(addToBasketIcon);
		setActualBasketButtonCallback(() => addToBasket);
	};

	const [actualBasketButtonCallback, setActualBasketButtonCallback] =
		useState<() => void>(() => addToBasket);

	let clickedOnBasked = false;

	return (
		<Card
			body
			className="product-card"
			onClick={() => {
				!clickedOnBasked && linkRef.current?.click();
				clickedOnBasked = false;
			}}
		>
			{sale && (
				<Card.Header>
					<div className="product-card__sale">Знижка {sale}</div>
				</Card.Header>
			)}
			<Card.Img
				className="product-card__image"
				src={imagePath}
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
					onClick={(e) => {
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
