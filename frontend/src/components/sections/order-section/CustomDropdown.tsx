import { Dropdown, DropdownProps } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useState } from "react";

interface IProps extends DropdownProps {
	isInvalid: boolean;
}

export const CustomDropdown = (props: IProps) => {
	const [filter, setFilter] = useState<string>("");

	return (
		<Dropdown
			virtualScrollerOptions={{
				itemSize: 38,
			}}
			filterInputAutoFocus
			emptyMessage="Немає результатів"
			emptyFilterMessage="Немає результатів"
			placeholder="Вибирай"
			filter
			filterMatchMode="startsWith"
			filterTemplate={(options) => (
				<InputText
					onKeyDown={options.filterOptions.filter}
					onChange={(e) => {
						setFilter(e.target.value);
					}}
					placeholder="Пошук"
					value={filter}
					className="w-100"
				/>
			)}
			itemTemplate={(option) => {
				return (
					<span>
						{props.optionLabel ? option[props.optionLabel] : option}
					</span>
				);
			}}
			className={classNames({
				"p-invalid": props.isInvalid,
			})}
			{...props}
		/>
	);
};
