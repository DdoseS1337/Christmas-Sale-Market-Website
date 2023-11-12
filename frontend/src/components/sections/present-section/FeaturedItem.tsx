import { ReactNode } from "react";

interface IProps {
	icon: ReactNode;
	title: string;
	description: string;
}

export const FeaturedItem = ({ icon, title, description }: IProps) => {
	return (
		<div className="featured__item feature">
			<div className="feature__icon">{icon}</div>
			<div>
				<h3 className="feature__title">{title}</h3>
				<p className="feature__description">{description}</p>
			</div>
		</div>
	);
};
