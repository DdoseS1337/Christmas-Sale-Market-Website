import classNames from "classnames";
import { ReactNode, MouseEvent, memo } from "react";

interface IProps extends ILeftMenuItem {
	isActive: boolean;
	onSelect: (e: MouseEvent<HTMLLIElement>) => void;
}

export interface ILeftMenuItem {
	icon?: ReactNode;
	name: string;
}

export const LeftMenuItem = memo(
	({ isActive, icon, name, onSelect }: IProps) => {
		return (
			<li
				className={classNames("left-menu__item", {
					"left-menu__item--active": isActive,
				})}
				onClick={onSelect}
			>
				{icon && <div className="left-menu__icon">{icon}</div>}
				{name}
			</li>
		);
	}
);
