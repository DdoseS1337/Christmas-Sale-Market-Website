import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { HouseDoor, HouseDoorFill } from "react-bootstrap-icons";
import localizations from "../../interfaces/NavBarLocalization";
import christmasTreeApi from "../../services/christmas-tree.api";
import { BackgroundType, Section } from "../common/Section";
import "../../styles/components/breadcrumb.css";

interface IProps {
    additionalBreadCrumbs?: { id: number; name: string };
}

const NavBar = ({ additionalBreadCrumbs }: IProps) => {
    const location = useLocation();
    let pathnames = location.pathname.split("/").filter((x) => x);

    if (pathnames.includes("catalog")) {
        const searchParams = new URLSearchParams(location.search).get(
            "categoryId"
        );
        if (searchParams !== null) {
            pathnames.push(searchParams);
        }
    }

    const [isHovered, setIsHovered] = useState(false);
    const [apiLocalizations, setApiLocalizations] = useState<{
        [key: string]: string;
    }>({});

    useEffect(() => {
        try {
            const updatedLocalizations: { [key: string]: string } = {
                ...localizations,
            };

            if (
                additionalBreadCrumbs !== undefined &&
                additionalBreadCrumbs !== null
            ) {
                let { id, name } = additionalBreadCrumbs;
                updatedLocalizations[id] = name;
            }

            setApiLocalizations(updatedLocalizations);
        } catch (error) {
            console.error("Помилка отримання даних з API", error);
        }
    }, [localizations, additionalBreadCrumbs]);

    function getTranslation(pageName: string) {
        return (
            apiLocalizations[pageName] || localizations[pageName] || pageName
        );
    }

    return location.pathname !== "/" ? (
        <Section
            backgroundType={BackgroundType.RedWithSnow}
            unPadded
            width="1380px"
        >
            <Row className="py-3" style={{ paddingLeft: 16 }}>
                <Col className="justify-content-end">
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
                                const isLast = index === pathnames.length - 1;
                                const pageName = getTranslation(name);

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
                </Col>
            </Row>
        </Section>
    ) : null;
};

export default NavBar;
