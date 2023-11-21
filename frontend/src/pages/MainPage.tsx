import { ShortOffersPreviewer } from "../components/sections/short-offers-previewer/ShortOffersPreviewer";
import { PresentSection } from "../components/sections/present-section/PresentSection";
import HotOffer from "../components/main/HotOffer";
import BottomCarousel from "../components/main/BottomCarousel";

const MainPage = () => {
    return (
        <>
            <PresentSection />
            <ShortOffersPreviewer />
            <HotOffer />
            <BottomCarousel/>
        </>
    );
};

export default MainPage;
