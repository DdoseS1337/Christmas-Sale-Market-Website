import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CatalogPage from "./pages/CatalogPage";
import ProductPage from "./pages/ProductPage";
import ContactsPage from "./pages/ContactsPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    return (
        <Router>
            <Header />
            {/* <Main> */}
            <Routes>
                {/* <Route path="/" element={<Main />} /> */}
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/catalog/:id" element={<ProductPage />} />
                <Route path="/contacts" element={<ContactsPage />} />
            </Routes>
            {/* </Main> */}
            <Footer />
        </Router>
    );
}

export default App;
