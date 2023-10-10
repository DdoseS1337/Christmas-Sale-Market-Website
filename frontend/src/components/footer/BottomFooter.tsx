import '../../styles/components/footer/bottom-footer.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FooterList from './FooterList'
import HeaderLogo from '../Header/HeaderLogo'
import { LinkWithIcon } from '../common/LinkWithIcon'

function BottomFooter() {
    return (
        <div className='bottom-footer'>
            <Container>
                <Row className='bottom-footer__row'>
                    <Col xs={4}>
                        <HeaderLogo />
                        <p className='mt-2'>Магазин з продажу новорічних товарів №1</p>
                        <div className='d-flex mb-1 ms-1'>
                            <LinkWithIcon
                                to="#"
                                src="/images/icons/viber.png"
                                text="viber"
                                className="me-3"
                            />
                            <LinkWithIcon
                                to="#"
                                src="/images/icons/telephone.png"
                                text="(063) 555-01-14"
                            />
                        </div>
                        <LinkWithIcon
                            to="#"
                            src="/images/icons/gmail.png"
                            text="example@gmail.com"
                            className='ms-1'
                        />
                        <p className='mt-3'>Christmas Market © 2022. All Rights Reserved</p>
                    </Col>
                    <Col>
                        <FooterList
                            title="My Account"
                            list={[
                                { text: "My Account", link: "" },
                                { text: "Order History", link: "" },
                                { text: "Shoping Cart", link: "" },
                                { text: "Wishlist", link: "" },
                            ]}
                        />
                    </Col>
                    <Col>
                        <FooterList
                            title="Helps"
                            list={[
                                { text: "Contact", link: "" },
                                { text: "Faqs", link: "" },
                                { text: "Terms & Condition", link: "" },
                                { text: "Privacy Policy", link: "" },
                            ]}
                        />
                    </Col>
                    <Col>
                        <FooterList
                            title="Сторінки"
                            list={[
                                { text: "Головна сторінка", link: "" },
                                { text: "Каталог", link: "" },
                                { text: "Кошик", link: "" },
                                { text: "Контакти", link: "" },
                            ]}
                        />
                    </Col>
                    <Col>
                        <FooterList
                            title="Categories"
                            list={[
                                { text: "Ялинки", link: "" },
                                { text: "Гірлянди хвойні", link: "" },
                                { text: "Новорічні вінки", link: "" },
                            ]}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default BottomFooter