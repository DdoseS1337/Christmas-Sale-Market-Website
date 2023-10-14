import { Col, Row } from "react-bootstrap";
import { BackgroundType, Section } from "../../common/Section";
import { ILeftMenuItem, LeftMenu } from "./LeftMenu";
import { AppIndicator, UniversalAccess } from "react-bootstrap-icons";
import { BannerBigCarousel } from "./BannerBigCarousel";
import { useState } from "react";
import { IBannerInfo } from "./BannerBig";
import { Featured } from "./Featured";
import "../../../styles/components/sections/present-section/present-section.css"

export const PresentSection = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	const items: (IBannerInfo | ILeftMenuItem)[] = [
		{
			icon: <AppIndicator />,
			name: "Ялинки та подарунки",
			imagePath: "/images/banners/banner1.png",
			title: "Ялинки та подарунки на новий рік",
			haveDiscount: true,
			discountNumber: 30,
			discounDescription: "Неймовірні знижки перед новим роком",
			orderLink: "#",
		},
		{
			icon: <UniversalAccess />,
			name: "Новорічні вінки",
			imagePath: "/images/banners/banner2.png",
			title: "Різноманітні новорічні вінки",
			haveDiscount: false,
			orderLink: "#",
		},
		{
			icon: <UniversalAccess />,
			name: "Штучні литі ялинки",
			imagePath: "/images/banners/banner3.png",
			title: "Штучні литі ялинки від виробника",
			haveDiscount: false,
			orderLink: "#",
		},
	];

	return (
		<Section style={{marginBottom: 50}} backgroundType={BackgroundType.RedWithSnow}>
			<Row style={{margin: "0 -12px"}}>
				<Col xs={3}>
					<LeftMenu
						intervalInSeconds={5}
						onSelectItem={(index: number) => {
							setActiveIndex(index);
						}}
						items={items as ILeftMenuItem[]}
					/>
				</Col>
				<Col>
					<BannerBigCarousel
						activeIndex={activeIndex}
						items={items as IBannerInfo[]}
					/>
				</Col>
			</Row>
			<Featured />
			<img className="present-tree" src="/images/pictures/decorated-christmas-tree.png" alt="decorated-christmas-tree" />
		</Section>
	);
};
