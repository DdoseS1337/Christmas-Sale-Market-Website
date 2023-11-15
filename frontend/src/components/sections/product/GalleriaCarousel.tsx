import Image from "react-bootstrap/Image";

export const GalleriaCarousel = (imageLink: any) => {
    return (
        <Image src={imageLink} alt="Product Image" style={{ width: "3.5rem" }} />
    );
};

export const GalleriaMainPhoto = (img: any) => {
    return (
        <Image
            fluid
            src={img}
            alt="Product Image"
            className="rounded"
            style={{ height: "24rem" }}
        />
    );
};
