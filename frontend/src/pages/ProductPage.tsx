import { useState, Dispatch, SetStateAction, useEffect } from "react";
import christmasTreeApi from "../services/christmas-tree.api";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import ProductParameters from "../interfaces/ProductParameters";
import { IOffer } from "../interfaces/Offer";
import { Col, Container, Row } from "react-bootstrap";
import { Galleria } from "primereact/galleria";
import DiscountBadge from "../components/sections/product/DiscountBadge";
import InStockBlock from "../components/sections/product/InStockBlock";
import GreyLine from "../components/sections/product/GreyLine";
import { ICategory } from "../interfaces/Category";
import {
    DashCircle,
    DashCircleFill,
    PlusCircle,
    PlusCircleFill,
} from "react-bootstrap-icons";
import "../styles/components/product.css";
import { CartService } from "../services/basketService";
import { SimilarProducts } from "../components/sections/similar-products/SimilarProducts";
import useHoverStates from "../components/sections/basket/AmountChangeHooks";
import {
    addToBasketIcon,
    removeFromBasketIcon,
} from "../components/sections/product/BasketIcons";
import {
    GalleriaMainPhoto,
    GalleriaCarousel,
} from "../components/sections/product/ProductGalleria";
import "../styles/components/basket.css";
import "../styles/components/adaptivity/product-adaptivity.css";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useRefresh } from "../hooks/UpdateComponentHook";
import ContinueShopping from "../components/common/ContinueShopping";

interface IProps {
    setAdditionalBreadCrumbs: Dispatch<SetStateAction<any>>;
}

const ProductPage = ({ setAdditionalBreadCrumbs }: IProps) => {
    const location = useLocation();
    const [amount, setAmount] = useState(1);
    const [notFound, setNotFound] = useState(false);
    const navigate = useNavigate();
    const pathnames = location.pathname.split("/").filter((x) => x);
    const [product, setProduct] = useState<IOffer | null>(null);
    const [category, setCategory] = useState<ICategory | null>(null);
    const [confirmShow, setConfirmShow] = useState(false);

    const isInCard = CartService.getCart()
        .map((item) => item.id)
        .includes(product?.id.toString() ?? "");
    const refresh = useRefresh();
    const {
        isMinusHovered,
        isPlusHovered,
        handleMinusMouseEnter,
        handleMinusMouseLeave,
        handlePlusMouseEnter,
        handlePlusMouseLeave,
    } = useHoverStates();

    const galleriaMainPhotoStyle = { width: "16rem" };
    const galleriaCarouselStyle = { width: "3.5rem" };

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
        if (pathnames[pathnames.length - 1] !== null) {
            christmasTreeApi
                .getOfferById(pathnames[pathnames.length - 1])
                .then((offer: IOffer) => {
                    setAdditionalBreadCrumbs(offer);
                    setProduct(offer);
                    christmasTreeApi
                        .getCategoryById(offer.categoryId.toString())
                        .then((category: ICategory) => {
                            if (!category.parentId) {
                                setCategory(category);
                            } else {
                                christmasTreeApi
                                    .getCategoryById(
                                        category.parentId.toString()
                                    )
                                    .then((category) => setCategory(category))
                                    .catch((error) =>
                                        console.log(
                                            `Error in ProductPage (setCategory): ${error}`
                                        )
                                    );
                            }
                        });
                })
                .catch((error) => {
                    setAdditionalBreadCrumbs({
                        id: pathnames[pathnames.length - 1],
                        name: "Сторінку не знайдено",
                    });
                    console.error(
                        "Product with current id not found. " + error
                    );
                    setNotFound(true);
                });
        }
    }, [location, setAdditionalBreadCrumbs]);

    const handleCategoryClick = (categoryId?: number) => {
        navigate(
            `/catalog?${
                categoryId ? `categoryId=${categoryId}&` : ""
            }priceMin=0&priceMax=20000`
        );
    };

    const addToBasket = () => {
        CartService.loadCart();
        CartService.addToCart({
            id: String(product!.id),
            name: product!.name,
            newPrice: product!.newPrice,
            picture: product!.picture,
            amount: amount,
        });
        setConfirmShow(true);
        refresh();
    };

    const removeFromBasket = () => {
        CartService.removeFromCart(String(product?.id));
        setConfirmShow(false);
        refresh();
    };

    if (notFound) {
        return <Navigate to="/404" />;
    }

    return (
        <>
            <ContinueShopping
                show={confirmShow}
                onHide={() => setConfirmShow(false)}
            />

            {product ? (
                <Container>
                    <Row>
                        <Col lg={4} className="d-flex justify-content-center">
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
                                        style: { color: "#c93f4f" },
                                    },
                                    previousThumbnailButton: {
                                        style: { color: "#c93f4f" },
                                    },
                                    thumbnailItemContent: {
                                        style: {
                                            border: "#c93f4f solid 1px",
                                        },
                                    },
                                    content: {
                                        style: { height: "auto" },
                                    },
                                    thumbnailContainer: {
                                        style: { padding: "0px" },
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
                        <Col
                            className="p-0 m-0 ms-3"
                            id="product-description-block"
                        >
                            <Container className="d-flex p-0 align-items-start">
                                <h2>{product?.name}</h2>
                                <InStockBlock available={product?.available} />
                            </Container>
                            <Container className="p-0">
                                <span className="text-decoration-line-through text-secondary fs-5">
                                    {product?.price}₴
                                </span>
                                <span className="ms-2 fs-5 fw-semibold">
                                    {product?.newPrice}₴
                                </span>
                                <DiscountBadge
                                    price={product?.price}
                                    newPrice={product?.newPrice}
                                />
                            </Container>
                            <GreyLine />
                            <Container className="p-0 d-flex align-items-center">
                                <h6 className="m-0">Склад: </h6>
                                <div className="product-storage-badge">1</div>
                            </Container>
                            <Container className="p-0 mt-4 d-flex align-items-center">
                                <h6 className="m-0">
                                    Категорія:
                                    <span
                                        className="text-secondary ms-2"
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            handleCategoryClick(category?.id)
                                        }
                                    >
                                        {category?.name}
                                    </span>
                                </h6>
                            </Container>
                            <GreyLine />
                            <Container className="p-0 d-flex">
                                <div
                                    className="d-flex justify-content-between p-2 border rounded-pill align-items-center h-25"
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
                                    className={`btn-red-theme d-inline-flex px-5 py-2 ms-4 rounded-5 align-items-center ${
                                        product?.available ? "" : "btn disabled"
                                    }`}
                                    onClick={() => {
                                        isInCard
                                            ? removeFromBasket()
                                            : addToBasket();
                                    }}
                                    id="product-btn-basket"
                                >
                                    {isInCard
                                        ? removeFromBasketIcon
                                        : addToBasketIcon}
                                </div>
                            </Container>
                            <GreyLine />
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <h5
                            className="product-h6-title"
                            style={{ width: "12rem" }}
                        >
                            Характеристики
                        </h5>
                        <div className="border-bottom" />
                    </Row>
                    <Container className="m-0 p-0 mt-4 d-flex flex-wrap justify-content-between">
                        {product?.param.map(
                            (item: ProductParameters, index) => (
                                <div
                                    key={index}
                                    className="border-bottom mb-3 pb-3 d-flex justify-content-between"
                                    style={{ width: "48%" }}
                                    id="product-characteristics"
                                >
                                    <h6 className="m-0 fw-bold">
                                        {item.name}:
                                    </h6>
                                    <span>{item.description}</span>
                                </div>
                            )
                        )}
                    </Container>
                </Container>
            ) : (
                <LoadingSpinner variant="danger" />
            )}
            {product && <SimilarProducts categoryId={product?.categoryId} />}
        </>
    );
};

export default ProductPage;
