import Logo from "../header/HeaderLogoContainer";
import Basket from "../header/BasketContainer";
import ContactsBar from "../header/HeaderContactsBar";
import NavBar from "../header/HeaderNavBar";
import SearchBar from "../header/HeaderSearchbar";
import Snowfall from "./Snowfall";
import { Col, Container, Row } from "react-bootstrap";

const Header = () => {
    return (
        <Container fluid>
            <Row className="red_theme p-3 text-center position-relative">
                <Snowfall />
                <Col>
                    <Logo />
                </Col>
                <Col>
                    <SearchBar />
                </Col>
                <Col>
                    <Basket />
                </Col>
            </Row>
            <Row className="p-2 white_theme_black">
                <Col>
                    <NavBar />
                </Col>
                <Col className="d-flex justify-content-center align-items-center">
                    <ContactsBar />
                </Col>
            </Row>
        </Container>
    );
};

export default Header;
