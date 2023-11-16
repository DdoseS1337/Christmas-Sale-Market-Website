import "../../../styles/components/sections/order-section/order-section.css";
import { Container, Image } from "react-bootstrap";
import RoundedButton from "../../common/RoundedButton";
import { CartService } from "../../../services/basketService";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
	IOrderCustomerInformation,
	OrderCustomerInformationValidation as CustomerInformationFormFields,
} from "../../../interfaces/Order";
import { useValidation } from "react-class-validator";
import { useFormik } from "formik";
import { OrderForm } from "./OrderForm";
import { Button } from "primereact/button";

export const OrderSection = () => {
	const itemsOfCart = CartService.getCart();
	const totalPrice = CartService.getTotalPrice();

	const [customerInformation, setCustomerInformation] =
		useState<IOrderCustomerInformation>({
			firstName: "",
			secondName: "",
			city: "",
			phoneNumber: "",
			branchOfNovaPoshta: "",
		});

	const [validate, errors] = useValidation(CustomerInformationFormFields);
	const formik = useFormik({
		initialValues: {
			firstName: "",
			secondName: "",
			city: "",
			branchOfNovaPoshta: "",
			phoneNumber: "",
		} as CustomerInformationFormFields,
		validate: async (data) => {
			await validate(data);
			return errors;
		},
		onSubmit: sendOrder,
	});

	return (
		<Container
			fluid
			className="d-flex align-items-start justify-content-around"
		>
			<OrderForm
				setCustomerInformation={setCustomerInformation}
				formik={formik}
			/>

			<div className="order-summary">
				<h3 className="order-sum">Підсумок Замовлення</h3>
				<ul className="product-basket">
					{itemsOfCart &&
						itemsOfCart.map((item) => {
							return (
								<li key={item.id} className="product-listing">
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
				<div>
					<p className="subtotal">
						Проміжний підсумок:{" "}
						<span>
							<b>{totalPrice} грн</b>
						</span>
					</p>
					<hr className="divide" />
					<p className="total">
						Повна сума :{" "}
						<span>
							<b>{totalPrice} грн</b>
						</span>
					</p>
				</div>
				<div className="payment-method">
					<h4 className="order-pay">Спосіб оплати</h4>
					<label className="mb-5">
						<input type="radio" name="payment" /> Оплата при
						отриманні
					</label>
				</div>

				<RoundedButton
					className="d-flex justify-content-center"
					onClick={async () => {
						await formik.validateForm();
						formik.isValid && (await formik.submitForm());
					}}
				>
					Замовити товар
				</RoundedButton>
			</div>
		</Container>
	);

	async function sendOrder(data: CustomerInformationFormFields) {
		// TODO: validation of all fields
		// if (customerInformation === undefined) {
		// 	setErrorMessage("Ви не заповнили усі поля");
		// 	return;
		// }
		// if (itemsOfCart.length === 0) {
		// 	setErrorMessage("У кошику немає товарів");
		// 	return;
		// }
		// orderService.sendOrder({
		// 	customerInformation: customerInformation!,
		// 	offers: itemsOfCart.map((item) => {
		// 		return {
		// 			offerId: Number(item.id),
		// 			number: item.amount,
		// 		};
		// 	}),
		// });
		console.log(data);
	}
};
