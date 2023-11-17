import "../../../styles/components/sections/order-section/order-section.css";
import { Container, Image } from "react-bootstrap";
import RoundedButton from "../../common/RoundedButton";
import { CartService } from "../../../services/basketService";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { OrderCustomerInformationValidation as CustomerInformationFormFields } from "../../../interfaces/Order";
import { useValidation } from "react-class-validator";
import { useFormik } from "formik";
import { OrderForm } from "./OrderForm";
import { Toast } from "primereact/toast";

export const OrderSection = () => {
	const itemsOfCart = CartService.getCart();
	const totalPrice = CartService.getTotalPrice();

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

	const toast = useRef<any>(null);

	const showSuccessOrderToast = () => {
		toast.current!.show({
			severity: "success",
			summary: "Успіх",
			detail: "Замовлення відправлено",
		});
	};

	return (
		<Container
			fluid
			className="d-flex align-items-start justify-content-around"
		>
			<Toast ref={toast} />
			<OrderForm formik={formik} />

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
				<div className="mb-4 mt-4">
					{/* <p className="subtotal">
						Проміжний підсумок:{" "}
						<span>
							<b>{totalPrice} грн</b>
						</span>
					</p> */}
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
		showSuccessOrderToast();
		console.log(data);
	}
};
