import { Col, Row } from "react-bootstrap";
import { BackgroundType, Section } from "../../common/Section";
import { LeftMenu } from "./LeftMenu";
import { BannerBig } from "./BannerBig";
import { AppIndicator } from "react-bootstrap-icons";

export const PresentSection = () => (
	<Section backgroundType={BackgroundType.RedWithSnow}>
		<Row>
			<Col xs={3}>
				<LeftMenu
					intervalInSeconds={1}
					onSelectItem={(index: number, name: string) => {
						console.log(index, name);
					}}
					items={[
						{icon: <AppIndicator />, name: "Fresh"},
						{name: "Vegetables"},
						{name: "River Fish"},
						{name: "Drink & Water"},
						{name: "Yogurt & Ice Cream"},
						{name: "Cake & Bread"},
						{name: "Butter & Cream"},
						{name: "Cookeng"},
					]}
				/>
			</Col>
			<Col>
				<BannerBig />
			</Col>
		</Row>
	</Section>
);
