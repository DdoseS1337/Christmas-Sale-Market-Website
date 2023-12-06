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
	filterMatchMode: "contains" | "startsWith";
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
	field,
	...wrapperProps
}: IProps) => {
	const [filter, setFilter] = filterState ?? [undefined, undefined];

	return (
		<CustomInputWrapper
			{...wrapperProps}
			field={field}
			isInvalid={isInvalid}
			input={
				<Dropdown
					pt={{
						root: {
							className: "dropdown",
						},
						input: {
							id: field,
							className: "dropdown__item",
						},
					}}
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
							onKeyUp={options.filterOptions.filter}
							onChange={
								setFilter
									? (e) => {
											setFilter(e.target.value);
									  }
									: undefined
							}
							placeholder="Пошук"
							value={filter}
							className="w-100"
						/>
					)}
					onChange={(e) => {
						setSelectedValue && setSelectedValue(e.value);
						setField(field, e.value.name);
					}}
					optionLabel={optionLabel}
					itemTemplate={(option) => {
						return (
							<span className="dropdown__item">
								{optionLabel ? option[optionLabel] : option}
							</span>
						);
					}}
					className={classNames({
						"p-invalid": isInvalid(field),
					})}
				/>
			}
		/>
	);
};
