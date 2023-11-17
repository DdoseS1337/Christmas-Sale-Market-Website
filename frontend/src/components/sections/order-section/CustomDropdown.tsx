import { Dropdown, DropdownProps } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Dispatch, SetStateAction, useState } from "react";
import {
	CustomInputWrapper,
	ICustomInputWrapperProps,
} from "./CustomInputWrapper";
import { IOrderCustomerInformation } from "../../../interfaces/Order";

interface IProps extends Omit<ICustomInputWrapperProps, "input"> {
	filterState?: [string, Dispatch<SetStateAction<string>>];
	options?: Array<any>;
	optionLabel: string;
	filterMatchMode: "startsWith" | "contains";
	disabled?: boolean;
	placeholder: string;
	value?: any;
	setField: (field: keyof IOrderCustomerInformation, value: string) => void;
	setSelectedValue?: (value: any) => void;
}

export const CustomDropdown = ({
	filterState,
	isInvalid,
	options,
	filterMatchMode,
	disabled,
	optionLabel,
	placeholder,
	value,
	setField,
	setSelectedValue,
	...wrapperProps
}: IProps) => {
	const [filter, setFilter] = filterState ?? [undefined, undefined];

	return (
		<CustomInputWrapper
			{...wrapperProps}
			isInvalid={isInvalid}
			input={
				<Dropdown
					value={value}
					options={options}
					disabled={disabled}
					filterMatchMode={filterMatchMode}
					virtualScrollerOptions={{
						itemSize: 38,
					}}
					filterInputAutoFocus
					emptyMessage="Немає результатів"
					emptyFilterMessage="Немає результатів"
					placeholder={placeholder}
					filter
					filterTemplate={(options) => (
						<InputText
							onKeyDown={options.filterOptions.filter}
							onChange={(e) => {
								setFilter && setFilter(e.target.value);
							}}
							placeholder="Пошук"
							value={filter}
							className="w-100"
						/>
					)}
					onChange={(e) => {
						setSelectedValue && setSelectedValue(e.value);
						setField(wrapperProps.field, e.value.name);
					}}
					optionLabel={optionLabel}
					itemTemplate={(option) => {
						return (
							<span>
								{optionLabel ? option[optionLabel] : option}
							</span>
						);
					}}
					className={classNames({
						"p-invalid": isInvalid(wrapperProps.field),
					})}
				/>
			}
		/>
	);
};
