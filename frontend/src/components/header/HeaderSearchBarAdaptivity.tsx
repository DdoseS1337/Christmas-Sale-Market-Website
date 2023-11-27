import { OrderList } from "primereact/orderlist";
import { IOffer } from "../../interfaces/Offer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import christmasTreeApi from "../../services/christmas-tree.api";
import InStockBlock from "../sections/product/InStockBlock";

const HeaderSearchBarAdaptivity = ({
    onHideSearch,
}: {
    onHideSearch: () => void;
}) => {
    const [search, setSearch] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const offers = await christmasTreeApi.getAllOffers();
                await setSearch(offers);
            } catch (error: any) {
                console.error(`Error in HeaderSearchBar: ${error.message}`);
            }
        };

        fetchData();
    }, []);

    const itemTemplate = (item: IOffer) => {
        return (
            <Link
                to={`/catalog/${item.id}`}
                className="d-flex gap-3 link-settings text-black align-items-center"
                onClick={() => {
                    window.scroll(0, 0);
                    onHideSearch();
                }}
            >
                <img
                    className="rounded border border-0"
                    style={{ width: "5rem" }}
                    src={item.picture[0]}
                    alt={item.name}
                />
                <div className="d-flex flex-column">
                    <span>{item.name}</span>
                    <div>
                        <span>
                            Вартість:
                            <span className="text-decoration-line-through ms-2 me-2">
                                {item.price}₴
                            </span>
                            {item.newPrice}₴
                        </span>
                        <InStockBlock available={item.available} />
                    </div>
                </div>
            </Link>
        );
    };

    return (
        <OrderList
            value={search}
            onChange={(e) => setSearch(e.value)}
            itemTemplate={itemTemplate}
            filter
            filterBy="name"
            dragdrop
            pt={{
                container: {
                    className: "w-100 z-3",
                    style: { height: "100vh" },
                },
                filterIcon: {
                    className: "d-flex align-items-center",
                },
                root: {
                    className: "position-absolute w-100",
                    style: { height: "100vh" },
                },
                list: {
                    className: "w-100",
                    style: { height: "100vh" },
                },
                controls: {
                    style: {
                        display: "none",
                    },
                },
            }}
        />
    );
};

export default HeaderSearchBarAdaptivity;
