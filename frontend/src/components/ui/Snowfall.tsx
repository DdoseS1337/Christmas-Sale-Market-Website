import { memo } from "react";

const Snowfall = memo(() => {
	return (
		<div className="snow_wrap">
			<div className="snow"></div>
		</div>
	);
});

export default Snowfall;
