import Logo from "../Header/HeaderLogo";
import Basket from "../Header/Basket";
import ContactsBar from "../Header/HeaderContactsBar";
import NavBar from "../Header/HeaderNavBar";
import SearchBar from "../Header/HeaderSearchbar";
import Snowfall from "./Snowfall";
import { Col, Container, Row } from "react-bootstrap";
import { ImportsNotUsedAsValues } from "typescript";

function Header() {
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
            <Row className="p-3">
                <Col>
                    <NavBar />
                </Col>
                <Col>
                    <ContactsBar />
                </Col>
            </Row>
        </Container>
    );
}

export default Header;

{
    /* <div className="test snow_wrap">
    <div className="snow"></div>
</div>  */
}
