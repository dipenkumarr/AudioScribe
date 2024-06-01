import React from "react";

const Header = () => {
	return (
		<header className="flex items-center justify-between gap-4 p-6">
			<h1 className="font-medium text-2xl">
				Audio<span className="text-blue-600 bold">Scribe.</span>
			</h1>
			<button className="flex items-center gap-2 btn py-2 px-4 rounded-lg text-black">
				<p>New</p>
				<i className="fa-solid fa-plus"></i>
			</button>
		</header>
	);
};

export default Header;
