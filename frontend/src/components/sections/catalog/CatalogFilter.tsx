import { Accordion, Form } from "react-bootstrap";
import "../../../styles/components/sections/catalog/catalog-filter.css";
import MultiRangeSlider from "../../common/MultiRangeSlider";
import { SetURLSearchParams, useSearchParams } from "react-router-dom";
import { ICategory } from "../../../interfaces/Category";
import { MultiRange } from "../../../interfaces/MultiRange";
import { CatalogPagination } from "./CatalogPagination";
import { IFilterPagination } from "../../../interfaces/FilterPage";
import { FILTER_CONST } from "../../../common";
import { CatalogFilterRadioButton } from "./CatalogFilterRadioButton";
import { classNames } from "primereact/utils";

interface IProps {
	categories: Array<ICategory>;
	selectedCategoryId?: number;
	priceRange: MultiRange;
	pagination?: IFilterPagination;
	className?: string;
}

export const CatalogFilter = ({
	categories,
	selectedCategoryId,
	priceRange,
	pagination,
	className,
}: IProps) => {
	const [queryParameters, setQueryParameters] = useSearchParams();

	return (
		<Accordion
			className={classNames("catalog-filter", className)}
			alwaysOpen
			defaultActiveKey={["0", "1", "2", "3", "4"]}
		>
			<Accordion.Item className="catalog-filter__block" eventKey="0">
				<Accordion.Header className="catalog-filter__title">
					Категорії
				</Accordion.Header>
				<Accordion.Body className="catalog-filter__body">
					<CatalogFilterRadioButton
						label="Усі"
						name="catalog-filter__category"
						checked={
							selectedCategoryId === null ||
							selectedCategoryId === undefined
						}
						changeQueryParameters={(parameters) => {
							parameters.delete(
								FILTER_CONST.QUERY_PARAMETERS.CATEGORY_ID
							);
							parameters.set(
								FILTER_CONST.QUERY_PARAMETERS.PAGE,
								"1"
							);
						}}
					/>
					{categories?.map((category, index) => {
						return (
							<CatalogFilterRadioButton
								key={category.id}
								label={category.name}
								name="catalog-filter__category"
								checked={category.id == selectedCategoryId}
								changeQueryParameters={(parameters) => {
									parameters.set(
										FILTER_CONST.QUERY_PARAMETERS
											.CATEGORY_ID,
										category.id.toString()
									);
									parameters.set(
										FILTER_CONST.QUERY_PARAMETERS.PAGE,
										"1"
									);
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
						name="Вартість"
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
					<CatalogFilterRadioButton
						label="Усі"
						name="catalog-filter__available"
						checked={
							queryParameters.has(
								FILTER_CONST.QUERY_PARAMETERS.AVAILABLE
							) == false
						}
						changeQueryParameters={(parameters) => {
							parameters.delete(
								FILTER_CONST.QUERY_PARAMETERS.AVAILABLE
							);
						}}
					/>
					<CatalogFilterRadioButton
						label="Тільки доступні"
						name="catalog-filter__available"
						checked={
							queryParameters.get(
								FILTER_CONST.QUERY_PARAMETERS.AVAILABLE
							) === "true"
						}
						changeQueryParameters={(parameters) => {
							parameters.set(
								FILTER_CONST.QUERY_PARAMETERS.AVAILABLE,
								"true"
							);
						}}
					/>
					<CatalogFilterRadioButton
						label="Тільки не доступні"
						name="catalog-filter__available"
						checked={
							queryParameters.get(
								FILTER_CONST.QUERY_PARAMETERS.AVAILABLE
							) === "false"
						}
						changeQueryParameters={(parameters) => {
							parameters.set(
								FILTER_CONST.QUERY_PARAMETERS.AVAILABLE,
								"false"
							);
						}}
					/>
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item className="catalog-filter__block" eventKey="3">
				<Accordion.Header className="catalog-filter__title">
					Сортування
				</Accordion.Header>
				<Accordion.Body className="catalog-filter__body">
					<CatalogFilterRadioButton
						label="Без сортування"
						name="catalog-filter__sorting"
						checked={
							queryParameters.has(
								FILTER_CONST.QUERY_PARAMETERS.SORTING
							) === false
						}
						changeQueryParameters={(parameters) => {
							parameters.delete(
								FILTER_CONST.QUERY_PARAMETERS.SORTING
							);
						}}
					/>
					<CatalogFilterRadioButton
						label="Від дешевих до дорогих"
						name="catalog-filter__sorting"
						checked={
							queryParameters.get(
								FILTER_CONST.QUERY_PARAMETERS.SORTING
							) === FILTER_CONST.SORTING_VALUES.ABC
						}
						changeQueryParameters={(parameters) => {
							parameters.set(
								FILTER_CONST.QUERY_PARAMETERS.SORTING,
								FILTER_CONST.SORTING_VALUES.ABC
							);
						}}
					/>
					<CatalogFilterRadioButton
						label="Від дорогих до дешевих"
						name="catalog-filter__sorting"
						checked={
							queryParameters.get(
								FILTER_CONST.QUERY_PARAMETERS.SORTING
							) === FILTER_CONST.SORTING_VALUES.DESC
						}
						changeQueryParameters={(parameters) => {
							parameters.set(
								FILTER_CONST.QUERY_PARAMETERS.SORTING,
								FILTER_CONST.SORTING_VALUES.DESC
							);
						}}
					/>
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item className="catalog-filter__block" eventKey="4">
				<Accordion.Header className="catalog-filter__title">
					Сторінки
				</Accordion.Header>
				<Accordion.Body className="catalog-filter__body">
					<CatalogPagination pagination={pagination} />
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
};
