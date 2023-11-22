import "../../styles/components/footer/bottom-footer.css";
import "../../styles/components/adaptivity/bottom-footer-adaptivity.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FooterList from "./FooterList";
import HeaderLogo from "../header/HeaderLogo";
import { LinkWithIcon } from "../common/LinkWithIcon";
import { CONTACTS } from "../../common";
import Snowfall from "../ui/Snowfall";

const BottomFooter = () => {
    return (
        <div className="bottom-footer">
            <Snowfall />
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
                                list={[
                                    { text: "Ялинки", link: "" },
                                    { text: "Гірлянди хвойні", link: "" },
                                    { text: "Новорічні вінки", link: "" },
                                ]}
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
        </div>
    );
};

export default BottomFooter;
