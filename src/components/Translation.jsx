import React from "react";
import { LANGUAGES } from "../utils/presets";

const Translation = ({
	textElement,
	toLanguage,
	setToLanguage,
	translating,
}) => {
	return (
		<div className="flex flex-col gap-2 w-full mx-auto">
			{!translating && (
				<div className="flex flex-col">
					<p className="text-base font-medium mr-auto mb-2">
						To Language
					</p>
					<div className="flex items-stretch">
						<select
							value={toLanguage}
							onChange={(e) => setToLanguage(e.target.value)}
							className="flex-1 outline-none bg-white focus:outline-none rounded-lg py-2 px-3 border-2 border-solid duration-200 hover:border-blue-500"
						>
							<option value={"Select Language"}>
								Select Language
							</option>
							{Object.entries(LANGUAGES).map((key, value) => {
								return (
									<option value={value} key={key}>
										{key}
									</option>
								);
							})}
						</select>
						<button className="btn ml-4 px-4 py-2 font-medium text-base rounded-xl border-2 text-blue-800 border-solid border-blue-500 bg-white duration-200 hover:bg-blue-500 hover:text-white">
							Translate
						</button>
					</div>
				</div>
			)}

			{textElement && !translating && <p>{textElement}</p>}

			{translating && (
				<div className="grid place-items-center">
					<i className="fa-solid da-spinner animate-spin"></i>
				</div>
			)}
		</div>
	);
};

export default Translation;
