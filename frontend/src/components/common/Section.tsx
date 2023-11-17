import { ReactNode } from "react";
import Snowfall from "../ui/Snowfall";
import { Container, ContainerProps } from "react-bootstrap";
import "../../styles/components/common/section.css";
import { useMediaQuery } from "react-responsive";
import { classNames } from "primereact/utils";

export enum BackgroundType {
	Transparent,
	RedWithSnow,
}

interface IProps extends React.AnchorHTMLAttributes<HTMLDivElement> {
	backgroundType?: BackgroundType;
	isFluid?: string | boolean;
	children: ReactNode[] | ReactNode;
	unPadded?: boolean;
	width?: string;
	pt?: {
		root?: React.HTMLAttributes<HTMLDivElement>;
		inner?: ContainerProps;
	};
}

export const Section = ({
	backgroundType,
	isFluid,
	children,
	unPadded,
	width,
	className,
	pt,
	...divProps
}: IProps) => {
	const isRedWithSnow = backgroundType === BackgroundType.RedWithSnow;

	const isDesktop = useMediaQuery({
		query: `(min-width: ${width})`,
	});

	return (
		<div
			{...divProps}
			{...pt?.root}
			className={classNames(
				"section",
				{
					"section--red": isRedWithSnow,
				},
				className
			)}
		>
			{isRedWithSnow && <Snowfall />}
			<Container
				{...pt?.inner}
				fluid={isFluid ?? "xl"}
				className={classNames(
					"position-relative",
					pt?.inner?.className,
					{
						"py-5": !unPadded,
					}
				)}
				style={{
					...pt?.inner?.style,
					maxWidth: isDesktop ? width : "",
				}}
			>
				{children}
			</Container>
		</div>
	);
};
