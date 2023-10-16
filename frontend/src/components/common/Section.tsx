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

export const Section = ({
	backgroundType,
	isFluid,
	children,
	haveMargin,
	bulge,
	className,
	...divProps
}: IProps) => {
	const isRedWithSnow = backgroundType === BackgroundType.RedWithSnow;

	return (
		<div
			className={`section ${
				isRedWithSnow ? "section--red" : ""
			} ${className}`}
			{...divProps}
		>
			{isRedWithSnow && <Snowfall />}
			<Container
				fluid={isFluid}
				className={`position-relative ${
					haveMargin ? "py-5" : ""
				}`}
			>
				<div
					style={{
						margin: `0px -${bulge}px`,
					}}
				>
					{children}
				</div>
			</Container>
		</div>
	);
};

Section.defaultProps = {
	haveMargin: true,
};
