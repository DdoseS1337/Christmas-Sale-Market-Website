import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CatalogPage from "./pages/CatalogPage";
import ProductPage from "./pages/ProductPage";
import ContactsPage from "./pages/ContactsPage";
import BasketPage from "./pages/BasketPage";
import OrderPage from "./pages/OrderPage";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import MainContainer from "./components/ui/MainContainer";
import NavBar from "./components/ui/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import InfoPage from "./pages/InfoPage";
import PolicyPage from "./pages/PolicyPage";
import { useState } from "react";

const App = () => {
    const [additionalBreadCrumbs, setAdditionalBreadCrumbs] = useState<any>();

    return (
        <Router>
            <Header />
            <NavBar additionalBreadCrumbs={additionalBreadCrumbs} />
            <MainContainer>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/information" element={<InfoPage />} />
                    <Route path="/catalog" element={<CatalogPage setAdditionalBreadCrumbs={setAdditionalBreadCrumbs}/>} />
                    <Route path="/catalog/:id" element={<ProductPage setAdditionalBreadCrumbs={setAdditionalBreadCrumbs}/>} />
                    <Route path="/contacts" element={<ContactsPage />} />
                    <Route path="/basket" element={<BasketPage />} />
                    <Route path="/basket/order" element={<OrderPage />} />
                    <Route path="/policy" element={<PolicyPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </MainContainer>
            <Footer />
        </Router>
    );
};

export default App;
