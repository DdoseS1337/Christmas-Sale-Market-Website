import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { HouseDoor, HouseDoorFill } from "react-bootstrap-icons";
import localizations from "../../interfaces/NavBarLocalization";
import "../../styles/components/breadcrumb.css";

const NavBar = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);
    const [isHovered, setIsHovered] = useState(false);

    return location.pathname !== "/" ? (
        <Container fluid className="pt-3 pb-3 red_theme">
            <Row>
                <Col xs={6} className="justify-content-end">
                    <Container className="w-50 ps-4">
                        <nav
                            aria-label="breadcrumb"
                            className="breadcrumb-separator"
                        >
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item breadcrumb-icons-position">
                                    <Link
                                        to="/"
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        onClick={() => setIsHovered(false)}
                                    >
                                        {localizations.home === "HouseDoor" ? (
                                            isHovered ? (
                                                <HouseDoorFill
                                                    size={20}
                                                    color="white"
                                                />
                                            ) : (
                                                <HouseDoor
                                                    size={20}
                                                    color="white"
                                                />
                                            )
                                        ) : (
                                            localizations.home
                                        )}
                                    </Link>
                                </li>
                                {pathnames.map((name, index) => {
                                    const routeTo = `/${pathnames
                                        .slice(0, index + 1)
                                        .join("/")}`;
                                    const isLast =
                                        index === pathnames.length - 1;
                                    const pageName =
                                        localizations[name] || name;

                                    return isLast ? (
                                        <li
                                            className="breadcrumb-item active text-light"
                                            key={name}
                                            aria-current="page"
                                        >
                                            {pageName}
                                        </li>
                                    ) : (
                                        <li
                                            className="breadcrumb-item text-light"
                                            key={name}
                                        >
                                            <Link
                                                to={routeTo}
                                                className="link-settings"
                                            >
                                                {pageName}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ol>
                        </nav>
                    </Container>
                </Col>
            </Row>
        </Container>
    ) : null;
};

export default NavBar;
