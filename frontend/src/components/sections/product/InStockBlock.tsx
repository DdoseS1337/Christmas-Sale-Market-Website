import InStockBlockProps from "../../../interfaces/InStockBlockProps";

const InStockBlock = ({ available }: InStockBlockProps) => {
    return (
        <div
            className={`${
                available
                    ? "bg-success-subtle  text-primary"
                    : "bg-danger-subtle text-danger"
            } ms-4 d-flex justify-content-center align-items-center  rounded-3 px-3 py-2`}
            style={{ whiteSpace: "nowrap" }}
        >
            <span>{available ? "В наявності" : "Немає в наявності"}</span>
        </div>
    );
};

export default InStockBlock;
