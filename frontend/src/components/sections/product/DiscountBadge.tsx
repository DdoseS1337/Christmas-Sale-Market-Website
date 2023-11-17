import DiscountBadgeInterface from "../../../interfaces/DiscountBadgeInterface";

const DiscountBadge = ({ price, newPrice }: DiscountBadgeInterface) => {
    const discountValue =
        price !== undefined && newPrice !== undefined
            ? (100 * (price - newPrice)) / price
            : undefined;
    const discount =
        discountValue !== undefined ? discountValue.toFixed(0) : null;

    return (
        <div className="rounded-2 bg-danger-subtle text-danger fw-semibold d-inline-flex ms-3 px-3 py-1">
            {discount !== null ? `Знижка: ${discount}%` : ""}
        </div>
    );
};

export default DiscountBadge;
