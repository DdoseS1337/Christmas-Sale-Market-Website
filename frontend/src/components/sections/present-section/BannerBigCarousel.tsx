import { Carousel } from "react-bootstrap";
import { BannerBigItem, IBannerInfo } from "./BannerBig";
import { memo } from "react";

interface IProps {
	activeIndex: number;
	items: IBannerInfo[];
}

export const BannerBigCarousel = memo(({ activeIndex, items }: IProps) => {
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
});
