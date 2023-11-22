import "../../../styles/components/sections/order-section/order-section.css";
import { Image, Spinner } from "react-bootstrap";
import RoundedButton from "../../common/RoundedButton";
import { CartService } from "../../../services/basketService";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import {
	OrderCustomerInformationValidation as CustomerInformationFormFields,
	IOrderOffer,
} from "../../../interfaces/Order";
import { useFormik } from "formik";
import { OrderForm } from "./OrderForm";
import { Toast } from "primereact/toast";
import { OrderService } from "../../../services/OrderService";
import { validate } from "class-validator";
import { Section } from "../../common/Section";
import { CONTACTS } from "../../../common";

export const OrderSection = () => {
	const itemsOfCart = CartService.getCart();
	const totalPrice = CartService.getTotalPrice();

	const formik = useFormik({
		initialValues: new CustomerInformationFormFields(),
		validate: async (data) => {
			const validateResult = await validate(data);
			return validateResult.reduce(
				(previous, current) => ({
					...previous,
					[current.property]: Object.values(current.constraints!)[0],
				}),
				{}
			);
		},
		onSubmit: sendOrder,
	});

	const toast = useRef<Toast>(null);
	const [isOrderSending, setIsOrderSending] = useState<boolean>(false);

	return (
		<>
			<Toast ref={toast} />
			<Section
				width="1400px"
				unPadded
				pt={{
					inner: {
						className:
							"d-flex justify-content-center align-items-start flex-wrap gap-5",
					},
				}}
			>
				<OrderForm formik={formik} />

				<div className="order-summary">
					<h3 className="order-sum">Підсумок Замовлення</h3>
					{itemsOfCart.length === 0 ? (
						<>
							<span className="d-block mt-3 lh-base">
								Немає товарів у кошику! Ви можете вибрати товар
								та повернутись сюди!
							</span>
							<RoundedButton
								className="d-flex justify-content-center mt-4"
								to="/catalog"
							>
								До каталогу
							</RoundedButton>
						</>
					) : (
						<>
							<ul className="product-basket">
								{itemsOfCart &&
									itemsOfCart.map((item) => {
										return (
											<li
												key={item.id}
												className="product-listing"
											>
												<Image
													src={item.picture[0]}
													alt={item.name}
													className="product-listing__image"
												/>
												<Link
													className="product-listing__name"
													to={"/catalog/" + item.id}
												>
													{item.name}
												</Link>
												<span className="product-listing__amount">
													x{item.amount}
												</span>
												<span>
													<b>{item.newPrice} грн</b>
												</span>
											</li>
										);
									})}
							</ul>
							<div className="mb-4 mt-4">
								<hr className="divide" />
								<p className="total">
									Повна сума :{" "}
									<span>
										<b>{totalPrice} грн</b>
									</span>
								</p>
							</div>
							<div className="payment-method">
								<h4 className="order-pay m-0">Оплата</h4>
								<small className="d-inline-flex pb-3">
									*Оплата тільки при отримані
								</small>
							</div>

							<RoundedButton
								className="d-flex justify-content-center"
								onClick={formik.submitForm}
							>
								{isOrderSending ? (
									<Spinner size="sm" />
								) : (
									"Замовити товар"
								)}
							</RoundedButton>
						</>
					)}
				</div>
			</Section>
		</>
	);

	async function sendOrder(data: CustomerInformationFormFields) {
		setIsOrderSending(true);
		const successfully = await OrderService.sendOrder({
			customerInformation: data,
			offers: itemsOfCart.map<IOrderOffer>((item) => ({
				id: Number(item.id),
				quantity: item.amount,
			})),
		});
		setIsOrderSending(false);

		if (successfully) {
			showSuccessOrderToast();
			CartService.clearStorage();
		} else {
			showFailedOrderToast();
		}
	}

	function showSuccessOrderToast() {
		toast.current!.show({
			severity: "success",
			summary: "Успіх",
			detail: "Ваше замовлення прийнято в обробку. Очікуйте дзвінка від оператора!",
		});
	}

	function showFailedOrderToast() {
		toast.current!.show({
			severity: "error",
			summary: "Ой, сталась помилка",
			detail: `Ви можете повідомити нам про помилку написавши на ${CONTACTS.email}!`,
			life: 6000,
		});
	}
};
