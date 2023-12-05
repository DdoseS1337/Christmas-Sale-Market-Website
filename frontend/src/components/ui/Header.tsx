import Logo from "../header/HeaderLogoContainer";
import Basket from "../header/BasketContainer";
import ContactsBar from "../header/HeaderContactsBar";
import NavBar from "../header/HeaderNavBar";
import { HeaderSearchBar } from "../header/searchbar/HeaderSearchbar";
import { Col, Row } from "react-bootstrap";
import { BackgroundType, Section } from "../common/Section";

const Header = () => {
	return (
		<>
			<Section
				backgroundType={BackgroundType.RedWithSnow}
				unPadded
				width="1380px"
				className="z-3"
				pt={{
					inner: {
						className: "header__first-row",
					},
				}}
			>
				<Logo />
				<HeaderSearchBar />
				<Basket />
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
