import Logo from "../header/HeaderLogoContainer";
import Basket from "../header/BasketContainer";
import ContactsBar from "../header/HeaderContactsBar";
import NavBar from "../header/HeaderNavBar";
import SearchBar from "../header/HeaderSearchbar";
import { Col, Row } from "react-bootstrap";
import { BackgroundType, Section } from "../common/Section";
import { useMediaQuery } from "react-responsive";
import { BREAKPOINTS } from "../../common";
import RoundedButton from "../common/RoundedButton";
import { Search } from "react-bootstrap-icons";
import HeaderSearchBarAdaptivity from "../header/HeaderSearchBarAdaptivity";
import { useState } from "react";

const Header = () => {
    const isTabletSearchbar = useMediaQuery({
        minWidth: BREAKPOINTS.TABLET.HEADER.SEARCHBAR,
    });
    const [showAdaptivity, setShowAdaptivity] = useState(false);

    return (
        <>
            <Section
                backgroundType={BackgroundType.RedWithSnow}
                unPadded
                width="1380px"
            >
                <Row className="p-3">
                    <Col>
                        <Logo />
                    </Col>
                    {isTabletSearchbar ? (
                        <>
                            <Col xs={6}>
                                <SearchBar />
                            </Col>
                            <Col className="d-flex justify-content-end">
                                <Basket />
                            </Col>
                        </>
                    ) : (
                        <Col className="d-flex justify-content-end alight-items-center">
                            <RoundedButton
                                className="me-3"
                                isCircle
                                onClick={() =>
                                    setShowAdaptivity(!showAdaptivity)
                                }
                            >
                                <Search fontSize={30} />
                            </RoundedButton>
                            <Basket />
                        </Col>
                    )}
                </Row>
            </Section>
            {showAdaptivity && !isTabletSearchbar && (
                <HeaderSearchBarAdaptivity
                    onHideSearch={() => setShowAdaptivity(false)}
                />
            )}
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
