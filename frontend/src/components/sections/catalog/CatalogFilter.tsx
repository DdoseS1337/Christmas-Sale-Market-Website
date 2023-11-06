import { Accordion, Form } from "react-bootstrap";
import "../../../styles/components/sections/catalog/catalog-filter.css";
import MultiRangeSlider from "../../common/MultiRangeSlider";
import { SetURLSearchParams } from "react-router-dom";
import { ICategory } from "../../../interfaces/Category";
import { MultiRange } from "../../../interfaces/MultiRange";

interface IProps {
	setQueryParameters: SetURLSearchParams;
	categories: Array<ICategory>;
	selectedCategoryId?: number;
	priceRange: MultiRange;
}

export const CatalogFilter = ({
	setQueryParameters,
	categories,
	selectedCategoryId,
	priceRange,
}: IProps) => {
	return (
		<Accordion
			className="catalog-filter"
			alwaysOpen
			defaultActiveKey={["0", "1", "2"]}
		>
			<Accordion.Item className="catalog-filter__block" eventKey="0">
				<Accordion.Header className="catalog-filter__title">
					Категорії
				</Accordion.Header>
				<Accordion.Body className="catalog-filter__body">
					{categories?.map((category, index) => {
						return (
							<Form.Check
								key={category.id}
								name="catalog-filter__category"
								type="radio"
								id={`catalog-filter__category-${index}`}
								className="catalog-filter__radio-control"
								label={category.name}
								checked={category.id == selectedCategoryId}
								onChange={(e) => {
									if (e.currentTarget.checked) {
										setQueryParameters((oldParameters) => {
											oldParameters.set(
												"categoryId",
												category.id.toString()
											);
											return oldParameters;
										});
									}
								}}
							/>
						);
					})}
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item className="catalog-filter__block" eventKey="1">
				<Accordion.Header className="catalog-filter__title">
					Ціна
				</Accordion.Header>
				<Accordion.Body className="catalog-filter__body">
					<MultiRangeSlider
						name="Price"
						min={priceRange.min}
						max={priceRange.max}
						onChange={(range) => {
							setQueryParameters((oldParameters) => {
								oldParameters.set(
									"priceMin",
									range.min.toString()
								);
								oldParameters.set(
									"priceMax",
									range.max.toString()
								);
								return oldParameters;
							});
						}}
					/>
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item className="catalog-filter__block" eventKey="2">
				<Accordion.Header className="catalog-filter__title">
					Наявність
				</Accordion.Header>
				<Accordion.Body className="catalog-filter__body">
					<Form.Check
						name="catalog-filter__available"
						type="radio"
						id={`catalog-filter__available-1`}
						className="catalog-filter__radio-control"
						label="Тільки доступні"
						onChange={(e) => {
							if (e.currentTarget.checked) {
								setQueryParameters((oldParameters) => {
									oldParameters.set("available", "true");
									return oldParameters;
								});
							}
						}}
					/>
					<Form.Check
						name="catalog-filter__available"
						type="radio"
						id={`catalog-filter__available-2`}
						className="catalog-filter__radio-control"
						label="Тільки не доступні"
						onChange={(e) => {
							if (e.currentTarget.checked) {
								setQueryParameters((oldParameters) => {
									oldParameters.set("available", "false");
									return oldParameters;
								});
							}
						}}
					/>
					<Form.Check
						name="catalog-filter__available"
						type="radio"
						id={`catalog-filter__available-3`}
						className="catalog-filter__radio-control"
						label="Усі"
						onChange={(e) => {
							if (e.currentTarget.checked) {
								setQueryParameters((oldParameters) => {
									oldParameters.delete("available");
									return oldParameters;
								});
							}
						}}
					/>
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
};
