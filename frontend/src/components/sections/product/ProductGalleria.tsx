import Image from "react-bootstrap/Image";

export const GalleriaMainPhoto = ({ src, styles }: any) => {
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

export const GalleriaCarousel = ({ src, styles }: any) => {
    return <Image src={src} alt="Product Image" style={styles} />;
};
