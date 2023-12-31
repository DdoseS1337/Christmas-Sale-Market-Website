import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { ReactElement, useEffect, useState } from "react";
import christmasTreeApi from "../../services/christmas-tree.api";
import { ICategory } from "../../interfaces/Category";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "primereact/skeleton";

const HeaderNavBar = () => {
    const [categories, setCategories] = useState<Array<ICategory>>([]);
    const navigate = useNavigate();

    useEffect(() => {
        christmasTreeApi
            .getAllCategories()
            .then((el) => {
                setCategories(
                    el.filter((obj) => obj.parentId == null).splice(0, 6)
                );
            })
            .catch((error) => console.log(error));
    }, []);

    const handleCategoryClick = (categoryId?: number) => {
        navigate(
            `/catalog?${
                categoryId ? `categoryId=${categoryId}&` : ""
            }priceMin=0&priceMax=20000`
        );
    };

    return (
        <Navbar expand="md" className="p-0">
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse>
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: "160px" }}
                >
                    <LinkContainer to="/">
                        <Nav.Link>Головна</Nav.Link>
                    </LinkContainer>
                    <NavDropdown title="Категорії" id="navbarScrollingDropdown">
                        {categories.length === 0
                            ? Array.from({ length: 6 }).map((_, index) => (
                                  <Skeleton
                                      key={index}
                                      height="2rem"
                                      className="my-1"
                                  />
                              ))
                            : categories.map<ReactElement>(
                                  (el: ICategory, index) => {
                                      return (
                                          <div key={index}>
                                              <NavDropdown.Item
                                                  onClick={() =>
                                                      handleCategoryClick(el.id)
                                                  }
                                              >
                                                  {el.name}
                                              </NavDropdown.Item>
                                              {categories.length - 1 ===
                                              index ? (
                                                  ""
                                              ) : (
                                                  <NavDropdown.Divider />
                                              )}
                                          </div>
                                      );
                                  }
                              )}
                    </NavDropdown>
                    <NavDropdown title="Сторінки" id="navbarScrollingDropdown">
                        <LinkContainer to="/">
                            <NavDropdown.Item>Головна</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => handleCategoryClick()}>
                            Каталог
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <LinkContainer to="/basket">
                            <NavDropdown.Item>Кошик</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Divider />
                        <LinkContainer to="/contacts">
                            <NavDropdown.Item>Контакти</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Divider />
                        <LinkContainer to="/information">
                            <NavDropdown.Item>Часті запитання</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Divider />
                        <LinkContainer to="/policy">
                            <NavDropdown.Item>
                                Угода користувача
                            </NavDropdown.Item>
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
