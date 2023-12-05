import { useMediaQuery } from "react-responsive";
import "../../../styles/components/header/header.css";
import { NotAdaptedSearchBar } from "./NotAdaptedSearchbar";
import { BREAKPOINTS } from "../../../common";
import { useEffect, useState } from "react";
import RoundedButton from "../../common/RoundedButton";
import { Search, XLg } from "react-bootstrap-icons";
import { useSearchParams } from "react-router-dom";

export const HeaderSearchBar = () => {
	const isTabletSearchbar = useMediaQuery({
		minWidth: BREAKPOINTS.TABLET.HEADER.SEARCHBAR,
	});
	const [showAdaptivity, setShowAdaptivity] = useState(false);

	const [queryParameters] = useSearchParams();

	useEffect(() => {
		setShowAdaptivity(false);
	}, [queryParameters]);

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
				<div className="searchbar-mobile">
					<XLg
						size={32}
						className="searchbar-mobile__close"
						onClick={() => setShowAdaptivity(false)}
					/>
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
