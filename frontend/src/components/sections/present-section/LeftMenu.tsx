import { PlusLg } from "react-bootstrap-icons";
import "../../../styles/components/sections/present-section/left-menu.css";
import {
	ReactElement,
	createRef,
	useState,
	MouseEvent,
	ReactNode,
	useEffect,
} from "react";

interface IProps extends Omit<React.AnchorHTMLAttributes<HTMLUListElement>, "ref"> {
	items: IItem[];
	intervalInSeconds: number;
	onSelectItem?: (index: number, name: string) => void;
}

interface IItem {
	icon?: ReactNode;
	name: string;
}

export const LeftMenu = (props: IProps) => {
	if (props.items.length === 0) throw new Error("items lenght is zero");
	if (props.intervalInSeconds <= 0)
		throw new Error("intervalInSeconds equal ot or less than 0");

	const ulRef = createRef<HTMLUListElement>();
	const [activeItemIndex, setActiveItemIndex] = useState(0);

	const selectItem = (e: MouseEvent<HTMLLIElement>) => {
		var newActiveIndex = Array.prototype.indexOf.call(
			ulRef.current?.children,
			e.target
		);
		setActiveItemIndex(newActiveIndex);

		props.onSelectItem!(newActiveIndex, props.items[newActiveIndex].name);
	};

	useEffect(() => {
		const id = setInterval(() => {
			const nextActiveIndex =
				activeItemIndex === props.items.length - 1
					? 0
					: activeItemIndex + 1;

			props.onSelectItem!(
				nextActiveIndex,
				props.items[nextActiveIndex].name
			);

			setActiveItemIndex(nextActiveIndex);
		}, props.intervalInSeconds * 1000);

		return () => clearInterval(id);
	}, [props, activeItemIndex]);

	const mapedItems: ReactElement[] = props.items.map<ReactElement>(
		(item, index) => {
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
		}
	);

	return (
		<ul {...props} className={`left-menu ${props.className}`} ref={ulRef}>
			{mapedItems}
			<li className="left-menu__item left-menu__item--view-all">
				<div className="left-menu__icon">
					<PlusLg />
				</div>
				View all
			</li>
		</ul>
	);
};

LeftMenu.defaultValues = {
	onSelectItem: () => {},
};
