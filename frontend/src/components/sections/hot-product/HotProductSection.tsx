import React from "react";
import { Section } from "../../common/Section";
import { HotProductOfCategory } from "./HotProductOfCategory";
import "../../../styles/components/sections/hot-product/hot-product.css";

export const HotProductSection = () => {
	return (
		<Section className="hot-product" bulge={92}>
			<HotProductOfCategory categoryTitle="Ялинки" categoryId={0} />
			<HotProductOfCategory categoryTitle="Іграшки" categoryId={1} />
			<HotProductOfCategory categoryTitle="Інше" categoryId={2} />
		</Section>
	);
};
