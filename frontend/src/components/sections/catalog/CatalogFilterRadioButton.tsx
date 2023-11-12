import { Form } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

interface IProps {
	label: string;
	name: string;
	checked?: boolean;
	onChecked?: () => void;
	changeQueryParameters?: (queryParameters: URLSearchParams) => void;
}

export const CatalogFilterRadioButton = ({
	label,
	name,
	checked,
	onChecked,
	changeQueryParameters,
}: IProps) => {
	const [, setQueryParameters] = useSearchParams();

	return (
		<Form.Check
			name={name}
			id={name + "-" + crypto.randomUUID()}
			type="radio"
			className="catalog-filter__radio-control"
			label={label}
			checked={checked}
			onChange={(e) => {
				e.currentTarget.checked && onChecked && onChecked();
				e.currentTarget.checked &&
					changeQueryParameters &&
					setQueryParameters((oldParameters) => {
						changeQueryParameters(oldParameters);
						return oldParameters;
					});
			}}
		/>
	);
};
