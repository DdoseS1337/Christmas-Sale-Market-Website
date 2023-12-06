import { Col, Row } from "react-bootstrap";
import { BackgroundType, Section } from "../../common/Section";
import { LeftMenu } from "./LeftMenu";
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
import { useMemo, useState } from "react";
import { IBannerInfo } from "./BannerBig";
import { Featured } from "./Featured";
import Confetti from "react-confetti";
import "../../../styles/components/sections/present-section/present-section.css";
import { useMediaQuery } from "react-responsive";
import { BREAKPOINTS } from "../../../common";
import { ILeftMenuItem } from "./LeftMenuItem";

export const PresentSection = () => {
	const isTabletLeftMenu = useMediaQuery({
		minWidth: BREAKPOINTS.TABLET.PRESENT_SECTION.LEFT_BANNER_MENU,
	});

	const isTabletImages = useMediaQuery({
		minWidth: BREAKPOINTS.TABLET.PRESENT_SECTION.IMAGES,
	});

	const [activeIndex, setActiveIndex] = useState(0);
	const [showConfetti, setShowConfetti] = useState(false);

	const items = useMemo<Array<IBannerInfo | ILeftMenuItem>>(
		() => [
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
				orderLink: "/catalog?categoryId=74",
				buttonName: "Дивитись",
			},
			{
				icon: <BagHeartFill />,
				name: "Преміум ялинки",
				imagePath: "/images/banners/banner5.png",
				title: "Штучні литі ялинки преміум класу",
				haveDiscount: false,
				orderLink: "/catalog?categoryId=70",
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
				title: `З Новим ${new Date().getFullYear()} роком!`,
				haveDiscount: false,
				buttonName: "🎉 Ура!",
				onClick: () => {
					setShowConfetti(true);
					setTimeout(() => {
						setShowConfetti(false);
					}, 5000);
				},
			},
		],
		[]
	);

	return (
		<>
			{showConfetti && (
				<Confetti
					width={window.innerWidth - 30}
					height={window.innerHeight}
					numberOfPieces={400}
					tweenDuration={10000}
				/>
			)}
			<Section
				style={{ marginBottom: 50, marginTop: "-3rem" }}
				backgroundType={BackgroundType.RedWithSnow}
				pt={{
					inner: {
						className: "present-section__inner",
					},
				}}
			>
				<Row style={{ margin: "0 -12px" }}>
					<Col xs={3} className={isTabletLeftMenu ? "" : "d-none"}>
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
				{isTabletImages && (
					<img
						className="present-tree"
						src="/images/pictures/decorated-christmas-tree.png"
						alt="decorated-christmas-tree"
					/>
				)}
			</Section>
		</>
	);
};
