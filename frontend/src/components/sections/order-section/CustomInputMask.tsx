import { InputMask } from "primereact/inputmask";
import { IOrderCustomerInformation } from "../../../interfaces/Order";
import {
	CustomInputWrapper,
	ICustomInputWrapperProps,
} from "./CustomInputWrapper";
import { classNames } from "primereact/utils";

interface IProps extends Omit<ICustomInputWrapperProps, "input"> {
	setValue: (field: keyof IOrderCustomerInformation, value: string) => void;
	placeholder: string;
	mask: string;
}

export const CustomInputMask = ({
	setValue,
	placeholder,
	isInvalid,
	mask,
	field,
	...wrapperProps
}: IProps) => {
	return (
		<CustomInputWrapper
			{...wrapperProps}
			field={field}
			isInvalid={isInvalid}
			input={
				<InputMask
					id={field}
					placeholder={placeholder}
					mask={mask}
					onChange={(e) => {
						e.target.value && setValue(field, e.target.value);
					}}
					className={classNames({
						"p-invalid": isInvalid(field),
					})}
				/>
			}
		/>
	);
};
