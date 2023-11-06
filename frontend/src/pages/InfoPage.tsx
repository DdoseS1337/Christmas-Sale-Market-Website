import { Accordion, Container } from "react-bootstrap";
import { CONTACTS } from "../common";
import MediaQuery from "react-responsive";
import Image from "react-bootstrap/Image";
import "../styles/components/information.css";

const InfoPage = () => {
    return (
        <Container className="d-flex">
            <Container style={{ textAlign: "justify" }}>
                <h1>Часті запитання</h1>
                <Accordion defaultActiveKey="0" className="mt-4">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            Тип і система кріплення
                        </Accordion.Header>
                        <Accordion.Body>
                            <p>
                                Тип ялинок - ствольний. Система кріплення гілок
                                - відгібна. Кріплення литих гілочок до гілок
                                здійснюється за допомогою спеціальної шовкової
                                нитки. Кріплення гілок до стовбура здійснюється
                                за допомогою гнучкого дроту і зверху обмотується
                                ПВХ плівкою.
                            </p>
                            <p style={{ fontSize: "small" }}>
                                *у литих ялинках елемент ПВХ плівки присутній
                                тільки на основному стовбурі, ПВХ гілок та інших
                                додаткових вставок з даного матеріалу в товарі
                                немає.
                            </p>
                            <p>
                                Всі ялинки розбірні - складаються з 2-3 частин
                                стовбура, залежно від висоти.
                            </p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            З якою підставкою йде ялинка?
                        </Accordion.Header>
                        <Accordion.Body>
                            Всі види ялинок комплектуються підставкою. Розміри
                            ялинок зазначені в прайсі - це висота товару в зборі
                            (разом з підставкою і макушкою). Залежно від моделі
                            і типу ялинки, підставка може бути як пластикова,
                            так і металева. Ялинки з плівки і штучні сосни
                            комплектуються пластиковими ніжками (3 або 4 шт
                            залежно від висоти). Литі ялини комплектуються
                            розсувною металевою підставкою (білого або зеленого
                            кольору - залежно від виду ялинки).
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>
                            Як упаковані ялинки?
                        </Accordion.Header>
                        <Accordion.Body>
                            Штучні ялинки упаковані в картонній коробці з
                            фірмовим логотипом і зазначенням даних виробника.
                            Габарити коробки можна побачити в окремій колонці
                            прайсу, а так само в картці кожного товару на сайті.
                            Хвойні вінки і гірлянди упаковані в ПЕ рукав.
                            Детальні характеристики - вага (фактичний і
                            об'ємний), довжина голок і гілочок наших ялинок,
                            діаметр нижнього ярусу, тип і габарити пакування Ви
                            можете знайти в прайсі і картці товару на сайті.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>
                            Як зібрати наші ялинки?
                        </Accordion.Header>
                        <Accordion.Body>
                            Моделі з відгибною системою кріплення гілок
                            збираються дуже легко. Досить розібрати ствол,
                            притиснути до нього гілки, зняти підставку і скласти
                            все в коробку.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>
                            Як потрібно зберігати штучну ялинку?
                        </Accordion.Header>
                        <Accordion.Body>
                            Умови зберігання залежать від матеріалу. Ялинки з
                            засніженими гілками (флокованими) особливо чутливі
                            до перепадів температури і впливу високої вологості.
                            <br />- Зберігати їх потрібно в сухому, темному
                            місці при температурі від + 10 до + 25 ° C. <br />-
                            Моделі з литого полімеру без снігу зберігають при
                            температурі від + 5 до + 35 ° C. <br />
                            Ялинки з дротяним каркасом потрібно зберігати в
                            сухому місці при кімнатній температурі, оскільки в
                            холоді на металі випадає конденсат, який веде до
                            утворення корозії. Зберігати новорічні ялинки можна
                            тільки в сухих, опалюваних приміщеннях. Якщо балкон
                            засклений і утеплений, лоджія приєднана до кімнати,
                            а гараж опалюється, то вони підходять для зберігання
                            ялинок. Залишати штучні ялинки на холодних
                            мансардах, горищах, у підвалах, гаражах і на
                            відкритих балконах не можна!
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5">
                        <Accordion.Header>
                            Які місця підходять для зберігання?
                        </Accordion.Header>
                        <Accordion.Body>
                            <ul>
                                <li>комора</li>
                                <li>шафа</li>
                                <li>антресолі</li>
                                <li>
                                    ящик для зберігання в підставі ліжка або
                                    дивана
                                </li>
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="6">
                        <Accordion.Header>Зв'язок з нами</Accordion.Header>
                        <Accordion.Body className="d-flex flex-column">
                            <div>
                                <a
                                    href={"tel:" + CONTACTS.telephone}
                                    rel="noreferrer"
                                    className="link-underline link-underline-opacity-0"
                                >
                                    <img
                                        src="/images/icons/telephone.png"
                                        alt="telephone"
                                        className="contact-icon me-3"
                                    />
                                    <span>
                                        Номер телефону: {CONTACTS.telephone}
                                    </span>
                                </a>
                            </div>
                            <div className="mt-3">
                                <a
                                    href={CONTACTS.viber}
                                    rel="noreferrer"
                                    className="link-underline link-underline-opacity-0"
                                >
                                    <img
                                        src="/images/icons/viber.png"
                                        alt="telephone"
                                        className="contact-icon me-3"
                                    />
                                    <span>Viber</span>
                                </a>
                            </div>
                            <div className="mt-3">
                                <a
                                    href={"mailto:" + CONTACTS.email}
                                    rel="noreferrer"
                                    className="link-underline link-underline-opacity-0"
                                >
                                    <img
                                        src="/images/icons/gmail.png"
                                        alt="telephone"
                                        className="contact-icon me-3"
                                    />
                                    <span>{CONTACTS.email}</span>
                                </a>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Container>
            <MediaQuery minWidth={995}>
                <Container className="d-flex justify-content-center align-items-center">
                    <Image
                        src="images/pictures/santa-information.png"
                        style={{ width: "30rem", height: "30rem" }}
                    />
                </Container>
            </MediaQuery>
        </Container>
    );
};

export default InfoPage;
