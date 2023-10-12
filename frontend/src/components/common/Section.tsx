import { ReactNode } from "react";
import Snowfall from "../ui/Snowfall";
import { Container } from "react-bootstrap";
import "../../styles/components/common/section.css";

export enum BackgroundType {
	Transparent,
	RedWithSnow,
}

interface IProps {
	backgroundType?: BackgroundType;
	isFluid?: boolean;
	children: ReactNode[] | ReactNode;
	haveMargin?: boolean;
	bulge?: number;
}

export const Section = (props: IProps) => {
	const isRedWithSnow = props.backgroundType == BackgroundType.RedWithSnow;

	return (
		<div
			className={`position-relative section ${isRedWithSnow && "section--red"} ${props.haveMargin ?? "m-5"}`}
		>
			{isRedWithSnow && <Snowfall />}
			<Container fluid={props.isFluid}>
				<div
					style={{
						margin: `0px -${props.bulge}px`,
					}}
				>
					{props.children}
				</div>
			</Container>
		</div>
	);
};
