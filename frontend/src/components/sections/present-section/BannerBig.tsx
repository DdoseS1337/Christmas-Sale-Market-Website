import "../../../styles/components/sections/present-section/banner-big.css";
import { ArrowRight } from "react-bootstrap-icons";

export interface IBannerInfo {
	imagePath: string;
	title: string;
	haveDiscount?: boolean;
	discountNumber?: number;
	discounDescription?: string;
	orderLink: string;
}

export const BannerBigItem = ({
	imagePath,
	title,
	haveDiscount,
	discountNumber,
	discounDescription,
	orderLink,
}: IBannerInfo) => {
	return (
		<div
			className={`banner-big`}
			style={{
				backgroundImage: `linear-gradient(99deg, rgba(0, 0, 0, 0.60) 10.4%, rgba(0, 0, 0, 0.00) 59.43%), url(${imagePath})`,
				paddingBottom: !haveDiscount ? "60px" : "",
			}}
		>
			<h1 className="banner-big__title">{title}</h1>

			{haveDiscount && (
				<div className="banner-big__discount">
					<div className="banner-big__discount-header">
						<h2 className="banner-big__discount-title">Знижка</h2>
						<span className="banner-big__discount-number">
							{discountNumber}% OFF
						</span>
					</div>
					{discounDescription && (
						<p className="banner-big__discount-description">
							{discounDescription}
						</p>
					)}
				</div>
			)}

			<a href={orderLink} className="banner-big__button">
				Замовити
				<ArrowRight className="ms-2" />
			</a>
		</div>
	);
};
