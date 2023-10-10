import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CatalogPage from "./pages/CatalogPage";
import ProductPage from "./pages/ProductPage";
import ContactsPage from "./pages/ContactsPage";
import BasketPage from "./pages/BasketPage";
import OrderPage from "./pages/OrderPage";
import Header from "./components/UserInterface/Header";
import Footer from "./components/UserInterface/Footer";
import MainContainer from "./components/UserInterface/MainContainer";

function App() {
    return (
        <Router>
            <Header />
            <MainContainer>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/catalog" element={<CatalogPage />} />
                    <Route path="/catalog/:id" element={<ProductPage />} />
                    <Route path="/contacts" element={<ContactsPage />} />
                    <Route path="/basket" element={<BasketPage />} />
                    <Route path="/basket/order" element={<OrderPage />} />
                </Routes>
            </MainContainer>
            <Footer />
        </Router>
    );
}

export default App;
