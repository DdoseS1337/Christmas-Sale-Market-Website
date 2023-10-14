import { ReactNode } from "react";
import { Col } from "react-bootstrap";

interface IProps {
	icon: ReactNode;
	title: string;
	description: string;
}

export const FeaturedItem = (props: IProps) => {
	return (
		<div className="featured__item feature">
			<div className="feature__icon">{props.icon}</div>
			<div>
				<h3 className="feature__title">{props.title}</h3>
				<p className="feature__description">{props.description}</p>
			</div>
		</div>
	);
};
