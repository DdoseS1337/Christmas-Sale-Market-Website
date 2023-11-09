const InStockBlock = (props: any) => {
    return props.available ? (
        <div
            className="ms-4 d-flex justify-content-center align-items-center bg-success-subtle rounded-3 px-3 py-2 text-primary"
            style={{ whiteSpace: "nowrap" }}
        >
            <span>В наявності</span>
        </div>
    ) : (
        <div
            className="bg-danger-subtle ms-4 d-flex justify-content-center align-items-center rounded-3 px-3 py-2 text-danger"
            style={{ whiteSpace: "nowrap" }}
        >
            <span>Немає в наявності</span>
        </div>
    );
};

export default InStockBlock;
