import { Form } from "react-bootstrap";
import { useFetchData } from "../../../hooks/FetchDataHook";
import christmasTreeApi from "../../../services/christmas-tree.api";
import "../../../styles/components/sections/catalog/catalog-filter.css";

interface IProps {
	filterChanged: (category: any) => void;
}

export const CatalogFilter = ({ filterChanged }: IProps) => {
	const { items: categories } = useFetchData<any[]>({
		callApi: () =>
			christmasTreeApi.getAllCategories().then((categories) => {
				filterChanged(categories[0]);
				return categories;
			}),
		filter: (categories) => categories.parentId == null,
	});

	return (
		<div className="catalog-filter">
			<div className="catalog-filter__block">
				<h2>Categories</h2>
				{categories?.map((category, index) => {
					return (
						<Form.Check
							key={category.id}
							name="category-filter-control"
							type="radio"
							id={`category-${index}-filter-control`}
							label={category.name}
							checked={index == 0}
							onChange={(e) => {
								if (e.currentTarget.checked) {
									filterChanged(category);
								}
							}}
						/>
					);
				})}
			</div>
		</div>
	);
};
