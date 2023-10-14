import { ReactNode } from "react";
import Snowfall from "../ui/Snowfall";
import { Container } from "react-bootstrap";
import "../../styles/components/common/section.css";

export enum BackgroundType {
	Transparent,
	RedWithSnow,
}

interface IProps extends React.AnchorHTMLAttributes<HTMLDivElement> {
	backgroundType?: BackgroundType;
	isFluid?: boolean;
	children: ReactNode[] | ReactNode;
	haveMargin?: boolean;
	bulge?: number;
}

export const Section = (props: IProps) => {
	const isRedWithSnow = props.backgroundType === BackgroundType.RedWithSnow;

	return (
		<div
			className={`position-relative section ${isRedWithSnow ? "section--red" : ""} ${props.className}`}
			{...props}
		>
			{isRedWithSnow && <Snowfall />}
			<Container fluid={props.isFluid} className={`position-relative ${props.haveMargin ? "py-5" : ""}`}>
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

Section.defaultProps = {
	haveMargin: true
}