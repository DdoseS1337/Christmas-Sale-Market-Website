import { Col, Row } from "react-bootstrap";
import { BackgroundType, Section } from "../../common/Section";
import { ILeftMenuItem, LeftMenu } from "./LeftMenu";
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
import { BannerBigCarousel } from "./BannerBigCarousel";
import { useState } from "react";
import { IBannerInfo } from "./BannerBig";
import { Featured } from "./Featured";
import Confetti from "react-confetti";
import "../../../styles/components/sections/present-section/present-section.css";

export const PresentSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);

    const items: (IBannerInfo | ILeftMenuItem)[] = [
        {
            icon: <GiftFill />,
            name: "Шалені знижки",
            imagePath: "/images/banners/banner1.png",
            title: "Ялинки та подарунки на новий рік",
            haveDiscount: true,
            discountNumber: 30,
            discountDescription: "Неймовірні знижки перед новим роком",
            orderLink: "/catalog",
            buttonName: "Замовити",
        },
        {
            icon: <TreeFill />,
            name: "Штучні литі ялинки",
            imagePath: "/images/banners/banner2.png",
            title: "Штучні литі ялинки від виробника",
            haveDiscount: false,
            orderLink: "/catalog",
            buttonName: "Дивитись",
        },
        {
            icon: <Box2HeartFill />,
            name: "Без передоплати",
            imagePath: "/images/banners/banner8.png",
            title: `Оплата при отриманні товару`,
            orderLink: "/catalog",
            buttonName: "Замовити",
        },
        {
            icon: <RecordCircleFill />,
            name: "Новорічні вінки",
            imagePath: "/images/banners/banner3.png",
            title: "Різноманітні новорічні вінки",
            haveDiscount: false,
            orderLink: "/catalog",
            buttonName: "Дивитись",
        },
        {
            icon: <BagHeartFill />,
            name: "Преміум ялинки",
            imagePath: "/images/banners/banner5.png",
            title: "Штучні литі ялинки преміум класу",
            haveDiscount: false,
            orderLink: "/catalog",
            buttonName: "Дивитись",
        },
        {
            icon: <Box2Fill />,
            name: "Оптом дешевше",
            imagePath: "/images/banners/banner6.png",
            title: "Купувати разом вигідно!",
            haveDiscount: true,
            discountNumber: 15,
            discountDescription:
                "Оформлюй від 3 товарів в одному замовленні та отримуй знижку",
            orderLink: "/catalog",
            buttonName: "Замовити",
        },
        {
            icon: <EmojiSmileFill />,
            name: "Щасливі діти",
            imagePath: "/images/banners/banner9.png",
            title: "Створіть свято для вашої дитини!",
            orderLink: "/catalog",
            buttonName: "Замовити",
        },
        {
            icon: <TelephoneFill />,
            name: "Зв'язатися з нами",
            imagePath: "/images/banners/banner4.png",
            title: "Залишились питання? Зв'яжись з нами!",
            haveDiscount: false,
            orderLink: "/contacts",
            buttonName: "Зв'язатись",
        },
        {
            icon: <Stars />,
            name: "З Новим роком!",
            imagePath: "/images/banners/banner7.png",
            title: `З новим ${new Date().getFullYear()} роком!`,
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
                        <LeftMenu
                            intervalInSeconds={4}
                            onSelectItem={(index: number) => {
                                setActiveIndex(index);
                            }}
                            items={items as ILeftMenuItem[]}
                        />
                    </Col>
                    <Col>
                        <BannerBigCarousel
                            activeIndex={activeIndex}
                            items={items as IBannerInfo[]}
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