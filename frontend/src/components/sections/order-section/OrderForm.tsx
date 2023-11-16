import { Form, Toast } from "react-bootstrap";
import {
	IOrder,
	IOrderCustomerInformation,
	OrderCustomerInformationValidation,
} from "../../../interfaces/Order";
import {
	Dispatch,
	FormEventHandler,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import {
	FieldConfig,
	FieldInputProps,
	FormikErrors,
	FormikState,
	FormikTouched,
} from "formik";
import { Dropdown } from "primereact/dropdown";
import { CityDropdownItem, GetCityDropdownItem } from "./DropdownItems";
import { useFetchData } from "../../../hooks/FetchDataHook";
import novaPoshtaApi from "../../../services/NovaPoshtaApi";
import { ICity } from "../../../interfaces/NovaPoshta";
import { Skeleton } from "primereact/skeleton";

interface ICustomerInformationFields
	extends Partial<IOrderCustomerInformation> {}

interface IProps {
	setCustomerInformation: Dispatch<SetStateAction<IOrderCustomerInformation>>;
	formik: {
		handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
		errors: FormikErrors<IOrderCustomerInformation>;
		touched: FormikTouched<IOrderCustomerInformation>;
		setFieldValue: (
			field: string,
			value: any,
			shouldValidate?: boolean
		) => Promise<FormikErrors<IOrderCustomerInformation>> | Promise<void>;
		resetForm: (
			nextState?: Partial<FormikState<IOrderCustomerInformation>>
		) => void;
		getFieldProps: (
			nameOrOptions: string | FieldConfig<any>
		) => FieldInputProps<any>;
	};
}

export const OrderForm = ({ setCustomerInformation, formik }: IProps) => {
	const { items: allCities } = useFetchData<Array<ICity>>({
		callApi: async () => novaPoshtaApi.getCitiesByName(),
	});
	console.log(allCities);

	const toast = useRef<any>(null);

	const show = () => {
		toast.current!.show({
			severity: "success",
			summary: "Успіх",
			detail: "Замовлення відправлено",
		});
	};

	const isFormFieldInvalid = (name: keyof IOrderCustomerInformation) =>
		!!(formik.touched[name] && formik.errors[name]);

	const [selectedCity, setSelectedCity] = useState<ICity>();

	return (
		<form
			onSubmit={(e) => {
				show();
				formik.resetForm();
				formik.handleSubmit(e);
			}}
		>
			<Toast ref={toast} />

			<h1>Платіжна інформація</h1>
			<div className="mb-3 d-flex gap-2">
				<Form.Group className="d-flex flex-column gap-2">
					<label htmlFor="firstName">Ім'я*</label>
					<InputText
						style={{ minWidth: 300 }}
						placeholder="Ваше ім'я"
						onChange={(e) => {
							formik.setFieldValue("firstName", e.target.value);
						}}
						className={classNames({
							"p-invalid": isFormFieldInvalid("firstName"),
						})}
					/>
					<small className="p-error">
						{isFormFieldInvalid("firstName") &&
							formik.errors["firstName"]}
					</small>
				</Form.Group>
				<Form.Group className="d-flex flex-column gap-2">
					<label htmlFor="secondName">Прізвище*</label>
					<InputText
						style={{ minWidth: 300 }}
						placeholder="Ваше прізвище"
						onChange={(e) => {
							formik.setFieldValue("secondName", e.target.value);
						}}
						className={classNames({
							"p-invalid": isFormFieldInvalid("secondName"),
						})}
					/>
					<small className="p-error">
						{isFormFieldInvalid("secondName") &&
							formik.errors["secondName"]}
					</small>
				</Form.Group>
			</div>
			<div className="mb-3 d-flex gap-2">
				<Form.Group
					className="d-flex flex-column"
					style={{ minWidth: 300 }}
				>
					<Form.Label>Населений пункт*</Form.Label>
					<Dropdown
						value={selectedCity}
						onChange={(e) => {
							setSelectedCity(e.value);
							formik.setFieldValue("city", e.value.name);
						}}
						virtualScrollerOptions={{ itemSize: 38 }}
						filterInputAutoFocus
						emptyMessage="Завантажуємо..."
						emptyFilterMessage="Немає результатів"
						options={
							allCities ??
							Array.from({ length: 10 }, () => ({
								name: "",
								id: "",
							}))
						}
						optionLabel="name"
						placeholder="Виберай"
						filter
						filterMatchMode="startsWith"
						itemTemplate={(city: ICity) =>
							GetCityDropdownItem(
								city,
								allCities === null || allCities === undefined
							)
						}
						className={classNames({
							"p-invalid": isFormFieldInvalid("city"),
						})}
					/>
					<small className="p-error">
						{isFormFieldInvalid("city") && formik.errors["city"]}
					</small>
				</Form.Group>
			</div>
			<div className="mb-3 d-flex">
				<Form.Group
					className="d-flex flex-column"
					style={{ minWidth: 300 }}
				>
					<Form.Label>Населений пункт*</Form.Label>
					<Dropdown
						value={formik.getFieldProps("branchOfNovaPoshta").value}
						onChange={(e) => {
							formik.setFieldValue(
								"branchOfNovaPoshta",
								e.value.name
							);
						}}
						virtualScrollerOptions={{ itemSize: 38 }}
						filterInputAutoFocus
						emptyMessage="Завантажуємо..."
						emptyFilterMessage="Немає результатів"
						options={
							// allCities ??
							Array.from({ length: 10 }, () => ({
								name: "",
								id: "",
							}))
						}
						optionLabel="name"
						placeholder="Виберай"
						filter
						filterMatchMode="startsWith"
						itemTemplate={(branchName) => <span>{branchName}</span>}
						className={classNames({
							"p-invalid":
								isFormFieldInvalid("branchOfNovaPoshta"),
						})}
					/>
					<small className="p-error">
						{isFormFieldInvalid("branchOfNovaPoshta") &&
							formik.errors["branchOfNovaPoshta"]}
					</small>
				</Form.Group>
			</div>
			<div className="mb-3 d-flex">
				<Form.Group className="me-3">
					<Form.Label>Email</Form.Label>
					<Form.Control
						placeholder="example@gmail.com"
						type="email"
						onChange={(e) =>
							setFieldOfCustomerInformation({
								email: e.target.value,
							})
						}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Телефон*</Form.Label>
					<Form.Control
						type="text"
						placeholder="(+380)00-000-00-00"
						onChange={(e) =>
							setFieldOfCustomerInformation({
								phoneNumber: e.target.value,
							})
						}
					/>
				</Form.Group>
			</div>
			<hr className="divide" />
			<div className="mb-3">
				<h1>Додаткова інформація</h1>
				<Form.Group className="mb-3">
					<Form.Label>Примітки до замовлення</Form.Label>
					<Form.Control
						id="additional-info-textbox"
						as="textarea"
						placeholder="Примітки щодо вашого замовлення, напр. спеціальні примітки для доставки"
						onChange={(e) =>
							setFieldOfCustomerInformation({
								additionalInformation: e.target.value,
							})
						}
					/>
				</Form.Group>
			</div>
		</form>
	);

	function setFieldOfCustomerInformation(
		objectWithFields: ICustomerInformationFields
	) {
		setCustomerInformation((old) => {
			return {
				...old,
				...objectWithFields,
			} as IOrderCustomerInformation;
		});
	}
};
