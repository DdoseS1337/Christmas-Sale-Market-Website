import { ReactNode } from "react";
import Snowfall from "../ui/Snowfall";
import { Container } from "react-bootstrap";

enum BackgroundType {
	Transparent,
	RedWithSnow,
}

interface IProps {
	backgroundType: BackgroundType;
	isFluid: boolean;
	children: ReactNode[];
}

export const Section = (props: IProps) => {
	const isRedWithSnow = props.backgroundType == BackgroundType.RedWithSnow;

	return (
		<div className={"section" + (isRedWithSnow && " section--red")}>
			{isRedWithSnow == false && <Snowfall />}
			<Container fluid={props.isFluid}>{props.children}</Container>
		</div>
	);
};
