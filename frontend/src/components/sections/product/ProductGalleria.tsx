import Image from "react-bootstrap/Image";
import ProductGalleria from "../../../interfaces/ProductGalleria";

export const GalleriaMainPhoto = ({ src, styles }: ProductGalleria) => {
    return (
        <Image
            fluid
            src={src}
            alt="Product Big Image"
            className="rounded"
            style={styles}
        />
    );
};

export const GalleriaCarousel = ({ src, styles }: ProductGalleria) => {
    return <Image src={src} alt="Product Image" style={styles} />;
};
