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
	...wrapperProps
}: IProps) => {
	return (
		<CustomInputWrapper
			{...wrapperProps}
			isInvalid={isInvalid}
			input={
				<InputText
					placeholder={placeholder}
					onChange={(e) => {
						setValue(wrapperProps.field, e.target.value);
					}}
					className={classNames({
						"p-invalid": isInvalid(wrapperProps.field),
					})}
				/>
			}
		/>
	);
};
