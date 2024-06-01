import React from "react";

const FileDisplay = ({ file, audioStream, handleAudioReset }) => {
	return (
		<main className="flex-1 p-4 flex  text-center flex-col gap-3 sm:gap-4 md:gap-5 justify-center pb-40 w-fit max-w-full mx-auto">
			<h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
				Your <span className="text-blue-600 bold">File</span>
			</h1>

			<div className="mx-auto flex flex-col text-left my-4">
				<h3 className="font-semibold">Name</h3>
				<p>{file?.name || "Audio Stream"}</p>
			</div>

			<div className="flex items-center justify-between gap-4 font-medium">
				<button
					className="text-black p-3 rounded-lg bg-white duration-200 hover:text-blue-600"
					onClick={handleAudioReset}
				>
					Reset
				</button>
				<button className="btn p-3 rounded-lg text-black flex items-center gap-2 font-medium">
					<p>Transcribe</p>
					<i class="fa-solid fa-headphones"></i>
				</button>
			</div>
		</main>
	);
};

export default FileDisplay;
