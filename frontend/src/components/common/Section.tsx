import { ReactNode } from "react";
import Snowfall from "../ui/Snowfall";
import { Container, ContainerProps } from "react-bootstrap";
import "../../styles/components/common/section.css";
import { useMediaQuery } from "react-responsive";
import { classNames } from "primereact/utils";
import { BREAKPOINTS } from "../../common";
import { DeferredContent } from "primereact/deferredcontent";

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
	hideSnowOnMobile?: boolean;
}

export const Section = ({
	backgroundType,
	isFluid,
	children,
	unPadded,
	width,
	className,
	pt,
	hideSnowOnMobile,
	...divProps
}: IProps) => {
	const isRedWithSnow = backgroundType === BackgroundType.RedWithSnow;

	const isDesktop = useMediaQuery({
		query: `(min-width: ${width})`,
	});

	const canHideSnowQuery = useMediaQuery({
		query: `(max-width: ${BREAKPOINTS.PHONE.HIDE_SNOW}px)`,
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
			<DeferredContent>
				{isRedWithSnow &&
					(hideSnowOnMobile ? (
						!canHideSnowQuery && <Snowfall />
					) : (
						<Snowfall />
					))}
			</DeferredContent>
			<Container
				{...pt?.inner}
				fluid={isFluid ?? "xl"}
				className={classNames(
					"section__inner",
					{
						"section__inner--with-padding": !unPadded,
					},
					pt?.inner?.className
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
