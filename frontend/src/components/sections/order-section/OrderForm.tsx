import { Form } from "react-bootstrap";
import { IOrderCustomerInformation } from "../../../interfaces/Order";
import { useState } from "react";
import {
	FieldConfig,
	FieldInputProps,
	FormikErrors,
	FormikTouched,
} from "formik";
import { useFetchData } from "../../../hooks/FetchDataHook";
import { NovaPoshtaService } from "../../../services/NovaPoshtaApi";
import { ICity } from "../../../interfaces/NovaPoshta";
import { CustomDropdown } from "./CustomDropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { CustomInput } from "./CustomInput";
import { CustomInputMask } from "./CustomInputMask";

interface IProps {
	formik: {
		errors: FormikErrors<IOrderCustomerInformation>;
		touched: FormikTouched<IOrderCustomerInformation>;
		setFieldValue: (
			field: string,
			value: any,
			shouldValidate?: boolean
		) => Promise<FormikErrors<IOrderCustomerInformation>> | Promise<void>;
		getFieldProps: (
			nameOrOptions: string | FieldConfig<any>
		) => FieldInputProps<any>;
	};
}

export const OrderForm = ({ formik }: IProps) => {
	const [citiesFilter, setCitiesFilter] = useState<string>("");
	const [selectedCity, setSelectedCity] = useState<ICity>();

	const { items: cities } = useFetchData({
		executeIf: () => citiesFilter.length <= 2,
		callApi: async () => {
			formik.setFieldValue("branchOfNovaPoshta", "");
			return NovaPoshtaService.getCitiesByName(citiesFilter);
		},
		dependencies: [citiesFilter],
	});

	const { items: branchesOfCity } = useFetchData({
		executeIf: () => selectedCity != null,
		callApi: async () => {
			return NovaPoshtaService.getWarehouses(selectedCity!.id);
		},
		dependencies: [selectedCity],
	});

	const isFormFieldInvalid = (name: keyof IOrderCustomerInformation) =>
		!!(formik.touched[name] && formik.errors[name]);

	return (
		<form>
			<h1>Платіжна інформація</h1>
			<div className="mb-3 d-flex gap-2">
				<CustomInput
					width="1/3"
					label="Ім'я"
					placeholder="Ваше ім'я"
					field="firstName"
					isRequired
					setValue={formik.setFieldValue}
					isInvalid={isFormFieldInvalid}
					errors={formik.errors}
				/>
				<CustomInput
					width="1/3"
					label="Прізвище"
					placeholder="Ваше прізвище"
					field="secondName"
					isRequired
					setValue={formik.setFieldValue}
					isInvalid={isFormFieldInvalid}
					errors={formik.errors}
				/>
			</div>
			<div className="mb-3 d-flex gap-2">
				<CustomDropdown
					placeholder="Обирайте"
					value={selectedCity}
					setSelectedValue={setSelectedCity}
					isInvalid={isFormFieldInvalid}
					options={cities}
					optionLabel="name"
					filterMatchMode="startsWith"
					field="city"
					setField={formik.setFieldValue}
					label={"Населений пункт"}
					isRequired
					width={"1/3"}
					errors={formik.errors}
					filterState={[citiesFilter, setCitiesFilter]}
				/>
			</div>
			<div className="mb-3 d-flex">
				<CustomDropdown
					value={{
						name: formik.getFieldProps("branchOfNovaPoshta").value,
					}}
					disabled={selectedCity === undefined}
					placeholder={
						selectedCity === undefined
							? "Спочатку вибери місто"
							: "Обирайте"
					}
					isInvalid={isFormFieldInvalid}
					options={branchesOfCity}
					optionLabel="name"
					filterMatchMode="contains"
					field="branchOfNovaPoshta"
					setField={formik.setFieldValue}
					label={"Почтове відділення"}
					isRequired
					width={"full"}
					errors={formik.errors}
				/>
			</div>
			<div className="mb-3 d-flex gap-2">
				<CustomInput
					width="1/2"
					label="Пошта"
					placeholder="example@gmail.com"
					field="email"
					setValue={formik.setFieldValue}
					isInvalid={isFormFieldInvalid}
					errors={formik.errors}
				/>
				<CustomInputMask
					width="1/2"
					mask="+380(99)-999-99-99"
					label="Телефон"
					placeholder="(+380)00-000-00-00"
					field="phoneNumber"
					isRequired
					setValue={formik.setFieldValue}
					isInvalid={isFormFieldInvalid}
					errors={formik.errors}
				/>
			</div>
			<div className="mb-3">
				<Form.Group className="mb-3">
					<Form.Label>Примітки до замовлення</Form.Label>
					<InputTextarea
						id="additional-info-textbox"
						placeholder="Примітки щодо вашого замовлення, напр. спеціальні примітки для доставки"
						onChange={(e) =>
							formik.setFieldValue(
								"additionalInformation",
								e.target.value
							)
						}
					/>
				</Form.Group>
			</div>
		</form>
	);
};
