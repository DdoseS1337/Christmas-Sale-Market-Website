import "../../../styles/components/sections/present-section/left-menu.css";
import {
	ReactElement,
	createRef,
	useState,
	MouseEvent,
	ReactNode,
	useEffect,
} from "react";

interface IProps
	extends Omit<React.AnchorHTMLAttributes<HTMLUListElement>, "ref"> {
	items: ILeftMenuItem[];
	intervalInSeconds: number;
	onSelectItem?: (index: number) => void;
}

export interface ILeftMenuItem {
	icon?: ReactNode;
	name: string;
}

export const LeftMenu = ({
	items,
	intervalInSeconds,
	onSelectItem,
	className,
	...ulProps
}: IProps) => {
	if (items.length === 0) throw new Error("items lenght is zero");
	if (intervalInSeconds <= 0)
		throw new Error("intervalInSeconds equal ot or less than 0");

	const ulRef = createRef<HTMLUListElement>();
	const [activeItemIndex, setActiveItemIndex] = useState(0);

	const selectItem = (e: MouseEvent<HTMLLIElement>) => {
		var newActiveIndex = Array.prototype.indexOf.call(
			ulRef.current?.children,
			e.target
		);

		setActiveItemIndex(newActiveIndex);
		onSelectItem!(newActiveIndex);
	};

	useEffect(() => {
		const id = setInterval(() => {
			const nextActiveIndex =
				activeItemIndex === items.length - 1 ? 0 : activeItemIndex + 1;

			setActiveItemIndex(nextActiveIndex);
			onSelectItem!(nextActiveIndex);
		}, intervalInSeconds * 1000);

		return () => clearInterval(id);
	}, [items, intervalInSeconds, onSelectItem, activeItemIndex]);

	return (
		<ul {...ulProps} className={`left-menu ${className}`} ref={ulRef}>
			{items.map<ReactElement>((item, index) => {
				return (
					<li
						className={`left-menu__item ${
							activeItemIndex === index
								? "left-menu__item--active"
								: ""
						}`}
						onClick={selectItem}
						key={index}
					>
						{item.icon && (
							<div className="left-menu__icon">{item.icon}</div>
						)}
						{item.name}
					</li>
				);
			})}
		</ul>
	);
};

LeftMenu.defaultValues = {
	onSelectItem: () => {},
};