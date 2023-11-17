import { FormikErrors } from "formik";
import { IOrderCustomerInformation } from "../../../interfaces/Order";
import { Form } from "react-bootstrap";
import { ReactNode } from "react";

export interface ICustomInputWrapperProps {
	isInvalid: (field: keyof IOrderCustomerInformation) => boolean;
	field: keyof IOrderCustomerInformation;
	label: string;
	width: "1/3" | "1/2" | "full";
	errors: FormikErrors<IOrderCustomerInformation>;
	isRequired?: boolean;
	input: ReactNode;
}

export const CustomInputWrapper = ({
	isInvalid,
	field,
	label,
	width,
	errors,
	isRequired,
	input,
}: ICustomInputWrapperProps) => {
	return (
		<Form.Group
			className="d-flex flex-column gap-2"
			style={{
				width:
					width === "1/3" ? "35%" : width === "1/2" ? "50%" : "100%",
			}}
		>
			<label htmlFor={field}>
				{label}
				{isRequired && "*"}
			</label>

			{input}

			<small className="p-error">
				{isInvalid(field) && errors[field]}
			</small>
		</Form.Group>
	);
};
