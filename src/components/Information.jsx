import React, { useState, useEffect, useRef } from "react";
import Transcription from "./Transcription";
import Translation from "./Translation";

const Information = ({ output, finished }) => {
	const [tab, setTab] = useState("transcription");
	const [translation, setTranslation] = useState(null);
	const [translating, setTranslating] = useState(false);
	const [toLanguage, setToLanguage] = useState("Select Language");

	const worker = useRef();

	useEffect(() => {
		if (!worker.current) {
			worker.current = new Worker(
				new URL("../utils/translate.worker.js", import.meta.url),
				{
					type: "module",
				}
			);
		}

		const onMessageReceived = async (e) => {
			switch (e.data.status) {
				case "INITIATE":
					console.log("INITIATE");
					break;
				case "PROGRESS":
					console.log("PROGRESS");
					break;
				case "UPDATE":
					setTranslation(e.data.output);
					console.log(e.data.output);
					break;
				case "COMPLETE":
					setTranslating(false);
					console.log("COMPLETE");
					break;
				default:
					break;
			}
		};

		worker.current.addEventListener("message", onMessageReceived);

		return () => {
			worker.current.removeEventListener("message", onMessageReceived);
		};
	}, []);

	const textElement =
		tab === "transcription"
			? output.map((val) => val.text).join(" ")
			: translation || "No Translation Available";

	function handleCopy() {
		navigator.clipboard.writeText(textElement);
	}

	function handleDownload() {
		const blob = new Blob([textElement], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const element = document.createElement("a");
		element.href = url;
		element.download = `AudioScribe_Transcription_${new Date().toString()}.txt`;
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}

	function generateTranslation() {
		if (translating || toLanguage === "Select Language") {
			return;
		}

		setTranslating(true);

		worker.current.postMessage({
			text: output.map((val) => val.text),
			src_language: "eng_Latn",
			target_language: toLanguage,
		});
	}

	return (
		<main className="flex-1 p-4 flex text-center flex-col gap-3 sm:gap-4 justify-center pb-40 w-fit max-w-full mx-auto ">
			<h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
				Your <span className="text-blue-600 bold">Transcription</span>
			</h1>

			<div className="grid grid-cols-2 mx-auto items-center bg-white border-2 border-solid border-blue-600 rounded-full overflow-hidden shadow-lg mt-4">
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
				{(!finished || translating) && (
					<div className="grid place-items-center">
						<i className="fa-solid fa-spinner animate-spin"></i>
					</div>
				)}

				{tab === "transcription" ? (
					<Transcription textElement={textElement} />
				) : (
					<Translation
						textElement={textElement}
						toLanguage={toLanguage}
						setToLanguage={setToLanguage}
						translating={translating}
						setTranslation={setTranslation}
						setTranslating={setTranslating}
						generateTranslation={generateTranslation}
					/>
				)}
			</div>

			<div className="flex items-center gap-10 mx-auto text-lg">
				<button
					title="Copy"
					className="px-4 py-2 btn text-base rounded-full border-2 text-blue-800 border-solid border-blue-500 bg-white duration-200 hover:bg-blue-500 hover:text-white"
					onClick={handleCopy}
				>
					<i className="fa-solid fa-copy"></i>
				</button>
				<button
					title="Download"
					className="px-4 py-2 btn text-base rounded-full border-2 text-blue-800 border-solid border-blue-500 bg-white duration-200 hover:bg-blue-500 hover:text-white"
					onClick={handleDownload}
				>
					<i className="fa-solid fa-download"></i>
				</button>
			</div>
		</main>
	);
};

export default Information;
