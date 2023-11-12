import { Link } from "react-router-dom";
import "../../../styles/components/sections/present-section/banner-big.css";
import { ArrowRight } from "react-bootstrap-icons";
import { MouseEvent } from "react";
export interface IBannerInfo {
    imagePath: string;
    title: string;
    haveDiscount?: boolean;
    discountNumber?: number;
    discountDescription?: string;
    orderLink?: string;
    buttonName: string;
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

export const BannerBigItem = ({
    imagePath,
    title,
    haveDiscount,
    discountNumber,
    discountDescription,
    orderLink,
    buttonName,
    onClick,
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
                    {discountDescription && (
                        <p className="banner-big__discount-description">
                            {discountDescription}
                        </p>
                    )}
                </div>
            )}
            {orderLink && (
                <Link to={orderLink} className="banner-big__button">
                    {buttonName}
                    <ArrowRight className="ms-2" />
                </Link>
            )}
            {onClick && (
                <div className="banner-big__button" onClick={onClick}>
                    {buttonName}
                    <ArrowRight className="ms-2" />
                </div>
            )}
        </div>
    );
};
