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
	...wrapperProps
}: IProps) => {
	return (
		<CustomInputWrapper
			{...wrapperProps}
			isInvalid={isInvalid}
			input={
				<InputMask
					placeholder={placeholder}
					mask={mask}
					onChange={(e) => {
						e.target.value &&
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
