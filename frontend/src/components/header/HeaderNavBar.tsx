import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const HeaderNavBar = () => {
	return (
		<Navbar expand="md" className="p-0">
			<Navbar.Toggle aria-controls="navbarScroll" />
			<Navbar.Collapse>
				<Nav
					className="me-auto my-2 my-lg-0"
					style={{ maxHeight: "160px" }}
					navbarScroll
				>
					<LinkContainer to="/">
						<Nav.Link>Головна</Nav.Link>
					</LinkContainer>
					<NavDropdown title="Категорії" id="navbarScrollingDropdown">
						{/* Add current categories and links*/}
						<LinkContainer to="/basket">
							<NavDropdown.Item>Кошик</NavDropdown.Item>
						</LinkContainer>
						<NavDropdown.Divider />{" "}
					</NavDropdown>
					<NavDropdown title="Сторінки" id="navbarScrollingDropdown">
						<LinkContainer to="/">
							<NavDropdown.Item>Головна</NavDropdown.Item>
						</LinkContainer>
						<NavDropdown.Divider />
						<LinkContainer to="/catalog">
							<NavDropdown.Item>Каталог</NavDropdown.Item>
						</LinkContainer>
						<NavDropdown.Divider />
						<LinkContainer to="/basket">
							<NavDropdown.Item>Кошик</NavDropdown.Item>
						</LinkContainer>
						<NavDropdown.Divider />
						<LinkContainer to="/contacts">
							<NavDropdown.Item>Контакти</NavDropdown.Item>
						</LinkContainer>
					</NavDropdown>
					<LinkContainer to="/contacts">
						<Nav.Link>Контакти</Nav.Link>
					</LinkContainer>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default HeaderNavBar;
