import { ShortOffersPreviewer } from "../components/sections/short-offers-previewer/ShortOffersPreviewer";
import { PresentSection } from "../components/sections/present-section/PresentSection";
import HotOffer from "../components/main/HotOffer";

const MainPage = () => {
    return (
        <>
            <PresentSection />
            <ShortOffersPreviewer />
            <HotOffer />
        </>
    );
};

export default MainPage;
