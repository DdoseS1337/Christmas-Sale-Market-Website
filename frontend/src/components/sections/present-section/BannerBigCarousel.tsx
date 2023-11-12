import { Carousel } from "react-bootstrap";
import { BannerBigItem, IBannerInfo } from "./BannerBig";

interface IProps {
	activeIndex: number;
	items: IBannerInfo[];
}

export const BannerBigCarousel = ({ activeIndex, items }: IProps) => {
	return (
		<Carousel
			activeIndex={activeIndex}
			controls={false}
			interval={null}
			indicators={false}
		>
			{items.map((item, index) => (
				<Carousel.Item key={index}>
					<BannerBigItem {...item} />
				</Carousel.Item>
			))}
		</Carousel>
	);
};
