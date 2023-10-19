import { Col, Row } from "react-bootstrap";
import { BackgroundType, Section } from "../../common/Section";
import { BannerControlMenu, IBannerControlInfo } from "./BannerControlMenu";
import {
    Stars,
    TreeFill,
    GiftFill,
    TelephoneFill,
    RecordCircleFill,
    BagHeartFill,
    Box2HeartFill,
    Box2Fill,
    EmojiSmileFill,
} from "react-bootstrap-icons";
import { BannerCarousel } from "./BannerCarousel";
import { useState } from "react";
import { Featured } from "./Featured";
import Confetti from "react-confetti";
import "../../../styles/components/sections/present-section/present-section.css";
import { IBannerInfo } from "./Banner";

interface IBannerWithControlInfo extends
    Omit<IBannerInfo, "title">, 
    Omit<IBannerControlInfo, "title"> {
    bannerTitle: string;
    controlTitle: string;
}

export const PresentSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);

    const items: IBannerWithControlInfo[] = [
        {
            icon: <GiftFill />,
            controlTitle: "Шалені знижки",
            imagePath: "/images/banners/banner1.png",
            bannerTitle: "Ялинки та подарунки на новий рік",
            haveDiscount: true,
            discountNumber: 30,
            discountDescription: "Неймовірні знижки перед новим роком",
            orderLink: "/catalog",
            buttonName: "Замовити",
        },
        {
            icon: <TreeFill />,
            controlTitle: "Штучні литі ялинки",
            imagePath: "/images/banners/banner2.png",
            bannerTitle: "Штучні литі ялинки від виробника",
            haveDiscount: false,
            orderLink: "/catalog",
            buttonName: "Дивитись",
        },
        {
            icon: <Box2HeartFill />,
            controlTitle: "Без передоплати",
            imagePath: "/images/banners/banner8.png",
            bannerTitle: `Оплата при отриманні товару`,
            orderLink: "/catalog",
            buttonName: "Замовити",
        },
        {
            icon: <RecordCircleFill />,
            controlTitle: "Новорічні вінки",
            imagePath: "/images/banners/banner3.png",
            bannerTitle: "Різноманітні новорічні вінки",
            haveDiscount: false,
            orderLink: "/catalog",
            buttonName: "Дивитись",
        },
        {
            icon: <BagHeartFill />,
            controlTitle: "Преміум ялинки",
            imagePath: "/images/banners/banner5.png",
            bannerTitle: "Штучні литі ялинки преміум класу",
            haveDiscount: false,
            orderLink: "/catalog",
            buttonName: "Дивитись",
        },
        {
            icon: <Box2Fill />,
            controlTitle: "Оптом дешевше",
            imagePath: "/images/banners/banner6.png",
            bannerTitle: "Купувати разом вигідно!",
            haveDiscount: true,
            discountNumber: 15,
            discountDescription:
                "Оформлюй від 3 товарів в одному замовленні та отримуй знижку",
            orderLink: "/catalog",
            buttonName: "Замовити",
        },
        {
            icon: <EmojiSmileFill />,
            controlTitle: "Щасливі діти",
            imagePath: "/images/banners/banner9.png",
            bannerTitle: "Створіть свято для вашої дитини!",
            orderLink: "/catalog",
            buttonName: "Замовити",
        },
        {
            icon: <TelephoneFill />,
            controlTitle: "Зв'язатися з нами",
            imagePath: "/images/banners/banner4.png",
            bannerTitle: "Залишились питання? Зв'яжись з нами!",
            haveDiscount: false,
            orderLink: "/contacts",
            buttonName: "Зв'язатись",
        },
        {
            icon: <Stars />,
            controlTitle: "З Новим роком!",
            imagePath: "/images/banners/banner7.png",
            bannerTitle: `З новим ${new Date().getFullYear()} роком!`,
            haveDiscount: false,
            buttonName: "🎉 Ура!",
            onClick: () => {
                setShowConfetti(true);
                setTimeout(() => {
                    setShowConfetti(false);
                }, 5000);
            },
        },
    ];

    return (
        <>
            {showConfetti && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    numberOfPieces={400}
                    tweenDuration={10000}
                />
            )}
            <Section
                style={{ marginBottom: 50, marginTop: "-3rem" }}
                backgroundType={BackgroundType.RedWithSnow}
            >
                <Row style={{ margin: "0 -12px" }}>
                    <Col xs={3}>
                        <BannerControlMenu
                            intervalInSeconds={4}
                            onSelectItem={(index: number) => {
                                setActiveIndex(index);
                            }}
                            items={items.map(item => {
                                return {
                                    ...item,
                                    title: item.controlTitle
                                }
                            })}
                        />
                    </Col>
                    <Col>
                        <BannerCarousel
                            activeIndex={activeIndex}
                            items={items.map(item => {
                                return {
                                    ...item,
                                    title: item.bannerTitle
                                }
                            })}
                        />
                    </Col>
                </Row>
                <Featured />
                <img
                    className="present-tree"
                    src="/images/pictures/decorated-christmas-tree.png"
                    alt="decorated-christmas-tree"
                />
            </Section>
        </>
    );
};
