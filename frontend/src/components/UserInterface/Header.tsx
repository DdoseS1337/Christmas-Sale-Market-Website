import Logo from "../Header/HeaderLogoContainer";
import Basket from "../Header/BasketContainer";
import ContactsBar from "../Header/HeaderContactsBar";
import NavBar from "../Header/HeaderNavBar";
import SearchBar from "../Header/HeaderSearchbar";
import Snowfall from "./Snowfall";
import { Col, Container, Row } from "react-bootstrap";

const Header = () => {
    return (
        <Container fluid className="position-relative">
            <Snowfall />
            <Row className="red_theme p-3 text-center">
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
