import { useState } from "react";
import { Section } from "../../common/Section";
import { Catalog } from "./Catalog";
import { CatalogFilter } from "./CatalogFilter";
import { useSearchParams } from "react-router-dom";

export const CatalogSection = () => {
	const [queryParameters, setQueryParameters] = useSearchParams();
	const [category, setCategory] = useState<any>(queryParameters.get("id"));

	return (
		<Section width="1600px">
			<div className="mx-auto">
				<div className="d-flex align-items-start">
					<CatalogFilter
						filterChanged={(category) => {
							setCategory(category);
						}}
					/>
					{category && <Catalog category={category} />}
				</div>
			</div>
		</Section>
	);
};
