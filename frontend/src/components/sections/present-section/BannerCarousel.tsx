import { Carousel } from "react-bootstrap";
import { Banner, IBannerInfo } from "./Banner";

interface IProps {
	activeIndex: number;
	items: IBannerInfo[];
}

export const BannerCarousel = ({ activeIndex, items }: IProps) => {
	return (
		<Carousel
			activeIndex={activeIndex}
			controls={false}
			interval={null}
			indicators={false}
		>
			{items.map((item, index) => (
				<Carousel.Item key={index}>
					<Banner {...item} />
				</Carousel.Item>
			))}
		</Carousel>
	);
};
