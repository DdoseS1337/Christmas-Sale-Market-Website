import { ReactNode, MouseEvent, RefObject } from "react";
import "../../styles/components/footer/rounded-button.css";
import { Link, LinkProps, To } from "react-router-dom";
import { classNames } from "primereact/utils";

interface IProps extends Omit<LinkProps, "onClick" | "to" | "ref"> {
	children: ReactNode[] | ReactNode;
	isCircle?: boolean;
	inactive?: boolean;
	backgroundIsGray?: boolean;
	onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
	to?: To;
	ref?: RefObject<HTMLAnchorElement>;
}

const RoundedButton = ({
	children,
	isCircle,
	backgroundIsGray,
	onClick,
	to,
	inactive,
	...linkProps
}: IProps) => {
	linkProps.className = classNames(
		{
			"circle-button": isCircle,
			"rounded-button": !isCircle,
		},
		{
			"rounded-button--background-gray": backgroundIsGray,
			"rounded-button--background-red": !backgroundIsGray,
		},
		{
			"rounded-button--inactive": inactive,
		},
		linkProps.className
	);

	return (
		<Link
			{...(linkProps as LinkProps)}
			to={to ?? "#"}
			onClick={(event) => {
				if (inactive) {
					// cancel the click event and the link transition
					event.preventDefault();
					return;
				}

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
