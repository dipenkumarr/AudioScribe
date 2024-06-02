import React, { useState } from "react";
import Transcription from "./Transcription";
import Translation from "./Translation";

const Information = ({ output }) => {
	const [tab, setTab] = useState("transcription");
	const [translation, setTranslation] = useState(null);
	const [translating, setTranslating] = useState(null);
	const [toLanguage, setToLanguage] = useState("Select Language");

	function handleCopy() {
		navigator.clipboard.writeText(output);
	}
	function handleDownload() {
		const blob = new Blob([output], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const element = document.createElement("a");
		element.href = url;
		element.download = `AudioScribe_Transcription_${new Date().toDateString()}.txt`;
		document.appendChild(element);
		element.click();
	}

	function generateTranslation() {}

	const textElement =
		tab === "transcription" ? output.map((val) => val.text) : "Translation";

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

			<div className="my-10 flex flex-col text-lg mx-auto items-center justify-center">
				{tab === "transcription" ? (
					<Transcription textElement={textElement} />
				) : (
					<Translation
						textElement={textElement}
						toLanguage={toLanguage}
						setToLanguage={setToLanguage}
						translating={translating}
						translation={translation}
						setTranslation={setTranslation}
						setTranslating={setTranslating}
					/>
				)}
			</div>

			<div className="flex items-center gap-10 mx-auto text-lg">
				<button
					title="Copy"
					className="px-4 py-2 btn text-base rounded-full border-2 text-blue-800 border-solid border-blue-500 bg-white duration-200 hover:bg-blue-500 hover:text-white"
				>
					<i className="fa-solid fa-copy"></i>
				</button>
				<button
					title="Download"
					className="px-4 py-2 btn text-base rounded-full border-2 text-blue-800 border-solid border-blue-500 bg-white duration-200 hover:bg-blue-500 hover:text-white"
				>
					<i className="fa-solid fa-download"></i>
				</button>
			</div>
		</main>
	);
};

export default Information;
