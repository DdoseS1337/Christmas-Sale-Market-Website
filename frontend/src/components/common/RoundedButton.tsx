import { ReactNode, MouseEvent, RefObject } from "react";
import "../../styles/components/footer/rounded-button.css";
import { Link, LinkProps, To } from "react-router-dom";

interface IProps
	extends Omit<LinkProps, "onClick" | "to" | "ref"> {
	children: ReactNode[] | ReactNode;
	isCircle?: boolean;
	backgroundIsGray?: boolean;
	onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
	to?: To;
	ref?: RefObject<HTMLAnchorElement>
}

const RoundedButton = ({
	children,
	isCircle,
	backgroundIsGray,
	onClick,
	to,
	...linkProps
}: IProps) => {

	const className = isCircle ? "circle-button" : "rounded-button";
	linkProps.className = className + (backgroundIsGray ? " rounded-button--background-gray " : " rounded-button--background-red ") + (linkProps.className ? ` ${linkProps.className}` : ``);

	return (
		<Link
			{...(linkProps as LinkProps)}
			to={to ?? "#"}
			onClick={(event) => {
				if (onClick) {
					event.preventDefault();
					onClick(event);
				}
			}}
		>
			{children}
		</Link>
	);
};

export default RoundedButton;
