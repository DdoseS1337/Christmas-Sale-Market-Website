import "../../styles/components/footer/bottom-footer.css";
import "../../styles/components/adaptivity/bottom-footer-adaptivity.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FooterList from "./FooterList";
import HeaderLogo from "../header/HeaderLogo";
import { LinkWithIcon } from "../common/LinkWithIcon";
import { CONTACTS } from "../../common";
import { useEffect, useState } from "react";
import christmasTreeApi from "../../services/christmas-tree.api";
import { ICategory } from "../../interfaces/Category";
import { BackgroundType, Section } from "../common/Section";

const BottomFooter = () => {
	const [categories, setCategories] = useState<Array<ICategory>>([]);

	useEffect(() => {
		christmasTreeApi
			.getAllCategories()
			.then((category) => {
				setCategories(
					category
						.filter(
							(obj) =>
								obj.parentId == null &&
								obj.name !== "АРХИВ НЕАКТИВНЫХ"
						)
						.splice(0, 6)
				);
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<Section backgroundType={BackgroundType.RedWithSnow}>
			<Container>
				<Row className="bottom-footer__row">
					<Col xs={4}>
						<HeaderLogo />
						<p className="mt-2">
							Магазин з продажу новорічних товарів №1
						</p>
						<div className="d-flex mb-1">
							<LinkWithIcon
								to={CONTACTS.viber}
								src="/images/icons/viber.png"
								text="viber"
								className="me-3"
							/>
							<LinkWithIcon
								to={"tel:" + CONTACTS.telephone}
								src="/images/icons/telephone.png"
								text={CONTACTS.telephone}
							/>
						</div>
						<LinkWithIcon
							to={"mailto:" + CONTACTS.email}
							src="/images/icons/gmail.png"
							text={CONTACTS.email}
						/>
					</Col>
					<div
						className="bottom-footer__bottom-row d-none"
						id="bottom-footer-hidden-element"
					/>
					<Col>
						<Container
							className="d-flex justify-content-around p-0"
							id="bottom-footer-container-adaptivity"
						>
							<FooterList
								title="Інформація"
								list={[
									{ text: "Контакти", link: "/contacts" },
									{
										text: "Часті запитання",
										link: "/information",
									},
									{
										text: "Угода користувача",
										link: "/policy",
									},
								]}
							/>
							<div
								className="bottom-footer__bottom-row d-none"
								id="bottom-footer-hidden-element-2"
							/>
							<FooterList
								title="Сторінки"
								list={[
									{ text: "Головна сторінка", link: "/" },
									{ text: "Каталог", link: "/catalog" },
									{ text: "Кошик", link: "/basket" },
									{ text: "Контакти", link: "/contacts" },
									{
										text: "Часті запитання",
										link: "/information",
									},
									{
										text: "Угода користувача",
										link: "/policy",
									},
								]}
							/>
							<div
								className="bottom-footer__bottom-row d-none"
								id="bottom-footer-hidden-element-2"
							/>
							<FooterList
								title="Категорії"
								list={categories.map((el: ICategory) => ({
									text: el.name,
									link: `/catalog?categoryId=${el.id}`,
								}))}
							/>
						</Container>
					</Col>
				</Row>
				<Row className="bottom-footer__bottom-row">
					<p className="m-0 ps-2">
						Christmas Market © {new Date().getFullYear()}. Всі права
						захищені
					</p>
				</Row>
			</Container>
		</Section>
	);
};

export default BottomFooter;
