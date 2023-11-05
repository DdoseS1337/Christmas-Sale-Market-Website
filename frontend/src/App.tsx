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

const App = () => {
	return (
		<Router>
			<Header />
			<NavBar />
			<MainContainer>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/information" element={<InfoPage />} />
					<Route path="/catalog" element={<CatalogPage />} />
					<Route path="/catalog/:id" element={<ProductPage />} />
					<Route path="/contacts" element={<ContactsPage />} />
					<Route path="/basket" element={<BasketPage />} />
					<Route path="/basket/order" element={<OrderPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</MainContainer>
			<Footer />
		</Router>
	);
};

export default App;
