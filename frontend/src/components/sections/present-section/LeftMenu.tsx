import "../../../styles/components/sections/present-section/left-menu.css";
import { createRef, useState, MouseEvent, useEffect, memo } from "react";
import { ILeftMenuItem, LeftMenuItem } from "./LeftMenuItem";

interface IProps
	extends Omit<React.AnchorHTMLAttributes<HTMLUListElement>, "ref"> {
	items: ILeftMenuItem[];
	intervalInSeconds: number;
	onSelectItem: (index: number) => void;
}

export const LeftMenu = memo(
	({
		items,
		intervalInSeconds,
		onSelectItem,
		className,
		...ulProps
	}: IProps) => {
		if (items.length === 0) throw new Error("items length is zero");
		if (intervalInSeconds <= 0)
			throw new Error("intervalInSeconds equal ot or less than 0");

		const ulRef = createRef<HTMLUListElement>();
		const [activeItemIndex, setActiveItemIndex] = useState(0);

		useEffect(() => {
			const id = setInterval(() => {
				const nextActiveIndex =
					activeItemIndex === items.length - 1
						? 0
						: activeItemIndex + 1;

				setActiveItemIndex(nextActiveIndex);
				onSelectItem(nextActiveIndex);
			}, intervalInSeconds * 1000);

			return () => clearInterval(id);
		}, [items, intervalInSeconds, activeItemIndex]);

		return (
			<ul {...ulProps} className={`left-menu ${className}`} ref={ulRef}>
				{items.map((item, index) => (
					<LeftMenuItem
						isActive={activeItemIndex === index}
						key={index}
						onSelect={selectItem}
						{...item}
					/>
				))}
			</ul>
		);

		function selectItem(e: MouseEvent<HTMLLIElement>) {
			var newActiveIndex = Array.prototype.indexOf.call(
				ulRef.current?.children,
				e.target
			);

			setActiveItemIndex(newActiveIndex);
			onSelectItem!(newActiveIndex);
		}
	}
);
