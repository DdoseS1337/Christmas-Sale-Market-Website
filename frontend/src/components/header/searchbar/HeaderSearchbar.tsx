import { useMediaQuery } from "react-responsive";
import "../../../styles/components/header/header.css";
import { NotAdaptedSearchBar } from "./NotAdaptedSearchbar";
import { BREAKPOINTS } from "../../../common";
import { useEffect, useState } from "react";
import RoundedButton from "../../common/RoundedButton";
import { Search, XLg } from "react-bootstrap-icons";
import { useLocation, useSearchParams } from "react-router-dom";

export const HeaderSearchBar = () => {
	const isTabletSearchbar = useMediaQuery({
		minWidth: BREAKPOINTS.TABLET.HEADER.SEARCHBAR,
	});
	const [showAdaptivity, setShowAdaptivity] = useState(false);

	const location = useLocation();

	useEffect(() => {
		console.log(13);
		setShowAdaptivity(false);
	}, [location]);

	return (
		<>
			{!isTabletSearchbar && (
				<RoundedButton
					className="ms-auto me-3"
					isCircle
					onClick={() => setShowAdaptivity(true)}
				>
					<Search fontSize={30} />
				</RoundedButton>
			)}
			{!isTabletSearchbar && showAdaptivity && (
				<div
					className="searchbar-mobile"
					onClick={(e) => {
						(e.target as HTMLDivElement).className ===
							"searchbar-mobile" && setShowAdaptivity(false);
					}}
				>
					<div className="searchbar-mobile__inner">
						<NotAdaptedSearchBar />
					</div>
					<span className="searchbar-mobile__description">
						Пишіть щоб отримати підказку
					</span>
				</div>
			)}
			{isTabletSearchbar && <NotAdaptedSearchBar />}
		</>
	);
};
