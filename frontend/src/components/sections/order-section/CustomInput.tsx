import { InputText } from "primereact/inputtext";
import { IOrderCustomerInformation } from "../../../interfaces/Order";
import {
	CustomInputWrapper,
	ICustomInputWrapperProps,
} from "./CustomInputWrapper";
import { classNames } from "primereact/utils";

interface IProps extends Omit<ICustomInputWrapperProps, "input"> {
	setValue: (field: keyof IOrderCustomerInformation, value: string) => void;
	placeholder: string;
}

export const CustomInput = ({
	setValue,
	placeholder,
	isInvalid,
	field,
	...wrapperProps
}: IProps) => {
	return (
		<CustomInputWrapper
			{...wrapperProps}
			field={field}
			isInvalid={isInvalid}
			input={
				<InputText
					id={field}
					placeholder={placeholder}
					onChange={(e) => {
						setValue(field, e.target.value);
					}}
					className={classNames({
						"p-invalid": isInvalid(field),
					})}
				/>
			}
		/>
	);
};
