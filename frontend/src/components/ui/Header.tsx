import Logo from "../header/HeaderLogoContainer";
import Basket from "../header/BasketContainer";
import ContactsBar from "../header/HeaderContactsBar";
import NavBar from "../header/HeaderNavBar";
import SearchBar from "../header/HeaderSearchbar";
import { Col, Row } from "react-bootstrap";
import { BackgroundType, Section } from "../common/Section";

const Header = () => {
    return (
        <>
            <Section backgroundType={BackgroundType.RedWithSnow} unPadded width="1380px">
                <Row className="p-3">
                    <Col>
                        <Logo />
                    </Col>
                    <Col xs={6}>
                        <SearchBar />
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Basket />
                    </Col>
                </Row>
            </Section>
            <Section unPadded width="1380px" className="z-1">
                <Row className="p-2 white_theme_black">
                    <Col>
                        <NavBar />
                    </Col>
                    <Col className="d-flex justify-content-end align-items-center">
                        <ContactsBar />
                    </Col>
                </Row>
            </Section>
        </>
    );
};

export default Header;
