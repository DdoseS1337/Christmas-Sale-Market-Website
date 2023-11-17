import { Galleria } from "primereact/galleria";
import { Col, Container, Image, Row } from "react-bootstrap";
import christmasTreeApi from "../../services/christmas-tree.api";
import { useEffect, useState } from "react";
import { IOffer } from "../../interfaces/Offer";
import MediaQuery from "react-responsive";
import useHoverStates from "../sections/basket/AmountChangeHooks";
import {
    ArrowRight,
    Dash,
    DashCircle,
    DashCircleFill,
    Plus,
    PlusCircle,
    PlusCircleFill,
} from "react-bootstrap-icons";
import { CartService } from "../../services/basketService";
import { BackgroundType, Section } from "../common/Section";
import "../../styles/components/adaptivity/hot-offer-adaptivity.css";
import { Link } from "react-router-dom";

const HotOffer = () => {
    const [product, setProduct] = useState<IOffer | null>(null);
    const [amount, setAmount] = useState(1);
    const [, setRefresh] = useState<boolean>(false);
    const {
        isMinusHovered,
        isPlusHovered,
        handleMinusMouseEnter,
        handleMinusMouseLeave,
        handlePlusMouseEnter,
        handlePlusMouseLeave,
    } = useHoverStates();
    const isInCard = CartService.getCart()
        .map((item) => item.id)
        .includes(product?.id.toString() ?? "");

    const amountChange = (operation: string) => {
        if (operation === "+") {
            const newAmount = amount + 1;
            setAmount(newAmount);
        } else if (operation === "-") {
            const newAmount = amount - 1;
            if (newAmount >= 1) {
                setAmount(newAmount);
            }
        }
    };

    const addToBasketIcon = (
        <>
            <Plus style={{ width: 25, height: 25 }} className="me-2" />
            <span style={{ whiteSpace: "nowrap" }}>Додати до кошику</span>
        </>
    );
    const removeFromBasketIcon = (
        <>
            <Dash style={{ width: 25, height: 25 }} className="me-2" />
            <span style={{ whiteSpace: "nowrap" }}>Видалити з кошика</span>
        </>
    );

    const addToBasket = () => {
        CartService.loadCart();
        CartService.addToCart({
            id: String(product!.id),
            name: product!.name,
            newPrice: product!.newPrice,
            picture: product!.picture,
            amount: amount,
        });
        setRefresh((oldValue) => !oldValue);
    };

    const removeFromBasket = () => {
        CartService.removeFromCart(String(product?.id));
        setRefresh((oldValue) => !oldValue);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const item = await christmasTreeApi.getOfferById("106");
                setProduct(item);
            } catch (error: any) {
                console.error(`Error in Hot Offer: ${error.message}`);
            }
        };

        fetchData();
    }, []);

    const GalleriaCarousel = (imageLink: any) => {
        return (
            <Image
                src={imageLink}
                alt="Product Image"
                style={{ width: "5rem" }}
            />
        );
    };

    const GalleriaMainPhoto = (img: any) => {
        return (
            <Image
                fluid
                src={img}
                alt="Product Image"
                className="rounded"
                style={{ width: "20rem" }}
            />
        );
    };

    return (
        <Section backgroundType={BackgroundType.RedWithSnow} isFluid>
            <Container>
                <h2 id="hotOffer-header-adaptivity">Гаряча пропозиція</h2>
            </Container>
            <Container>
                <Row
                    className="m-0 p-0 pt-4 pb-4 d-flex text-white align-items-center"
                    id="hotOffer-gallery-adaptivity"
                >
                    <Col xs={5} className="d-flex">
                        <Galleria
                            value={product !== null ? product.picture : []}
                            numVisible={3}
                            item={GalleriaMainPhoto}
                            thumbnailsPosition={"left"}
                            thumbnail={GalleriaCarousel}
                            showItemNavigators
                            showItemNavigatorsOnHover
                            circular
                            pt={{
                                nextThumbnailButton: {
                                    style: { color: "white" },
                                },
                                previousThumbnailButton: {
                                    style: { color: "white" },
                                },
                                thumbnailItemContent: {
                                    style: { border: "white solid 1px" },
                                },
                                thumbnailContainer: {
                                    style: { height: "30rem" },
                                },
                                thumbnailItem: {
                                    style: { height: "100%" },
                                },
                                thumbnailItemsContainer: {
                                    style: { height: "auto" },
                                },
                            }}
                        />
                    </Col>
                    <Col>
                        <h3 className="m-0 mb-3">
                            <Link
                                to={`/catalog/${product?.id}`}
                                className="text-decoration-none text-white"
                                onClick={() => window.scroll(0, 0)}
                            >
                                {product?.name}
                            </Link>
                        </h3>
                        <span className="fs-4">
                            Вартість:
                            <span className="text-white-50 text-decoration-line-through mx-2">
                                {product?.price}₴
                            </span>
                            {product?.newPrice}₴
                        </span>
                        <div className="p-0 d-flex mt-3">
                            <div
                                className="d-flex justify-content-between p-2 border rounded-pill align-items-center h-25 bg-white text-black"
                                style={{ minWidth: "80px", width: "7rem" }}
                            >
                                {isMinusHovered ? (
                                    <DashCircleFill
                                        className="basket-btn-quantity"
                                        onMouseLeave={handleMinusMouseLeave}
                                        onClick={() => amountChange("-")}
                                    />
                                ) : (
                                    <DashCircle
                                        className="basket-btn-quantity"
                                        onMouseEnter={handleMinusMouseEnter}
                                    />
                                )}
                                <span>{amount}</span>
                                {isPlusHovered ? (
                                    <PlusCircleFill
                                        className="basket-btn-quantity"
                                        onMouseLeave={handlePlusMouseLeave}
                                        onClick={() => amountChange("+")}
                                    />
                                ) : (
                                    <PlusCircle
                                        className="basket-btn-quantity"
                                        onMouseEnter={handlePlusMouseEnter}
                                    />
                                )}
                            </div>
                            <div
                                className="btn_white_theme d-inline-flex px-5 py-2 ms-4 rounded-5 align-items-center fw-bold"
                                onClick={() => {
                                    isInCard
                                        ? removeFromBasket()
                                        : addToBasket();
                                }}
                                id="hotOffer-btn-basket"
                            >
                                {isInCard
                                    ? removeFromBasketIcon
                                    : addToBasketIcon}
                            </div>
                        </div>
                        <h4 className="mt-4">Характеристики</h4>
                        <div className="m-0 p-0 mt-4 d-flex flex-wrap justify-content-between">
                            {product?.param.map((item: any, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="border-bottom mb-3 pb-3 d-flex justify-content-between"
                                        style={{ width: "48%" }}
                                        id="hotOffer-characteristics"
                                    >
                                        <h6 className="m-0 fw-bold">
                                            {item.name}:
                                        </h6>
                                        <span>{item.description}</span>
                                    </div>
                                );
                            })}
                            <Link
                                to={`/catalog/${product?.id}`}
                                className="products-of-category__view-all fw-bold text-white mb-4"
                                onClick={() => window.scroll(0, 0)}
                                style={{ width: "48%" }}
                                id="hotOffer-characteristics"
                            >
                                Переглянути сторінку товару
                                <ArrowRight className="ms-1" />
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>

            <MediaQuery minWidth={1590}>
                <img
                    src="/images/pictures/santa.png"
                    alt="santa-chimney"
                    className="position-absolute"
                    style={{
                        width: "20rem",
                        pointerEvents: "none",
                        transform: "rotate(0.97turn)",
                        top: "1rem",
                        right: "2rem",
                    }}
                />
            </MediaQuery>
            <img
                src="./images/pictures/presents.png"
                alt="presents-image"
                className="position-absolute bottom-0 start-0 ms-5"
                style={{ width: "12rem" }}
            />
            <MediaQuery minWidth={522}>
                <img
                    src="./images/pictures/presents.png"
                    alt="presents-image-reversed"
                    className="position-absolute bottom-0 end-0 me-5"
                    style={{ transform: "scaleX(-1)", width: "12rem" }}
                />
            </MediaQuery>
        </Section>
    );
};

export default HotOffer;
