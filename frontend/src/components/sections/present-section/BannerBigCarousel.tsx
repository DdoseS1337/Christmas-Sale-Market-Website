import { Carousel } from "react-bootstrap";
import { BannerBigItem, IBannerInfo } from "./BannerBig";

interface IProps {
	activeIndex: number;
	items: IBannerInfo[];
}

export const BannerBigCarousel = (props: IProps) => {
	return (
		<Carousel
			activeIndex={props.activeIndex}
			controls={false}
			interval={null}
			indicators={false}
		>
			{props.items.map((item) => (
				<Carousel.Item>
					<BannerBigItem {...item} />
				</Carousel.Item>
			))}
		</Carousel>
	);
};
