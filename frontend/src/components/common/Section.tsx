import { ReactNode } from "react";
import Snowfall from "../ui/Snowfall";
import { Container } from "react-bootstrap";
import "../../styles/components/common/section.css";
import { useMediaQuery } from "react-responsive";

export enum BackgroundType {
	Transparent,
	RedWithSnow,
}

interface IProps extends React.AnchorHTMLAttributes<HTMLDivElement> {
	backgroundType?: BackgroundType;
	isFluid?: boolean;
	children: ReactNode[] | ReactNode;
	unPadded?: boolean;
	width?: string;
}

export const Section = ({
	backgroundType,
	isFluid,
	children,
	unPadded,
	width,
	className,
	...divProps
}: IProps) => {
	const isRedWithSnow = backgroundType === BackgroundType.RedWithSnow;

	const isDesktop = useMediaQuery({
		query: `(min-width: ${width})`,
	});

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
				className={`position-relative ${unPadded ? "" : "py-5"}`}
				style={
					isDesktop
						? {
								maxWidth: width,
						  }
						: {}
				}
			>
				{children}
			</Container>
		</div>
	);
};
