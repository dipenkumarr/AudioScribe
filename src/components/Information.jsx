import React, { useState } from "react";

const Information = () => {
	const [tab, setTab] = useState("transcription");

	return (
		<main className="flex-1 p-4 flex text-center flex-col gap-3 sm:gap-4 justify-center pb-40 w-fit max-w-full mx-auto ">
			<h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
				Your <span className="text-blue-600 bold">Transcription</span>
			</h1>

			<div className="grid grid-cols-2 mx-auto items-center bg-white border-2 border-solid border-blue-600 rounded-full overflow-hidden shadow-lg">
				<button
					onClick={() => setTab("transcription")}
					className={
						"px-4 py-2 font-medium text-black text-base duration-200" +
						(tab === "transcription"
							? " bg-blue-500 text-white hover:bg-blue-700"
							: " hover:text-blue-800")
					}
				>
					Transcription
				</button>

				<button
					onClick={() => setTab("translation")}
					className={
						"px-4 py-2 font-medium text-black text-base duration-200 " +
						(tab === "translation"
							? " bg-blue-500 text-white hover:bg-blue-700"
							: "hover:text-blue-800")
					}
				>
					Translation
				</button>
			</div>
		</main>
	);
};

export default Information;
