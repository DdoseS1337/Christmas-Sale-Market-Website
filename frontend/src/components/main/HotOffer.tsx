import { Galleria } from "primereact/galleria";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import christmasTreeApi from "../../services/christmas-tree.api";
import { useEffect, useState } from "react";
import { IOffer } from "../../interfaces/Offer";
import MediaQuery from "react-responsive";
import useHoverStates from "../sections/basket/AmountChangeHooks";
import {
    ArrowRight,
    DashCircle,
    DashCircleFill,
    PlusCircle,
    PlusCircleFill,
} from "react-bootstrap-icons";
import { CartService } from "../../services/basketService";
import { BackgroundType, Section } from "../common/Section";
import "../../styles/components/adaptivity/hot-offer-adaptivity.css";
import { Link } from "react-router-dom";
import {
    GalleriaMainPhoto,
    GalleriaCarousel,
} from "../sections/product/ProductGalleria";
import {
    addToBasketIcon,
    removeFromBasketIcon,
} from "../sections/product/BasketIcons";
import ProductParameters from "../../interfaces/ProductParameters";

const HotOffer = () => {
    const [product, setProduct] = useState<IOffer | null>(null);
    const [, setRefresh] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    const [amount, setAmount] = useState(1);
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

    const galleriaMainPhotoStyle = { width: "20rem" };
    const galleriaCarouselStyle = { width: "4rem" };

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const offers = await christmasTreeApi
                    .getOffersByCategoryId(89)
                    .then((offers) => offers.filter((offer) => offer.available))
                    .then((offers) =>
                        offers.length > 7 ? offers.splice(0, 7) : offers
                    );

                const date = new Date().getDay();
                setProduct(offers[date]);
            } catch (error: any) {
                console.error(`Error in Hot Offer: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Section backgroundType={BackgroundType.RedWithSnow} isFluid>
            <Container>
                <h2 id="hotOffer-header-adaptivity">Гаряча пропозиція</h2>
            </Container>
            {isLoading ? (
                <div className="text-center">
                    <Spinner
                        animation="border"
                        style={{ width: "6rem", height: "6rem" }}
                    />
                </div>
            ) : (
                <Container>
                    <Row
                        className="m-0 p-0 pt-4 pb-4 d-flex text-white align-items-center"
                        id="hotOffer-gallery-adaptivity"
                    >
                        <Col xs={5} className="d-flex">
                            <Galleria
                                value={product !== null ? product.picture : []}
                                numVisible={3}
                                item={(img) => (
                                    <GalleriaMainPhoto
                                        src={img}
                                        styles={galleriaMainPhotoStyle}
                                    />
                                )}
                                thumbnailsPosition={"left"}
                                thumbnail={(imageLink) => (
                                    <GalleriaCarousel
                                        src={imageLink}
                                        styles={galleriaCarouselStyle}
                                    />
                                )}
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
                                        style: {
                                            height: "30rem",
                                            padding: "0px",
                                        },
                                    },
                                    thumbnailItem: {
                                        style: { height: "100%" },
                                    },
                                    thumbnailItemsContainer: {
                                        style: { height: "auto" },
                                    },
                                    previousItemButton: {
                                        style: {
                                            color: "black",
                                            width: "5rem",
                                            height: "calc(100% - 2rem)",
                                            top: "1rem",
                                            margin: 0,
                                            boxShadow: "none",
                                            backgroundColor: "transparent",
                                        },
                                    },
                                    nextItemButton: {
                                        style: {
                                            color: "black",
                                            width: "5rem",
                                            height: "calc(100% - 2rem)",
                                            top: "1rem",
                                            margin: 0,
                                            boxShadow: "none",
                                            backgroundColor: "transparent",
                                        },
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
                                {product?.param.map(
                                    (item: ProductParameters, index) => {
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
                                    }
                                )}
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
            )}

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
