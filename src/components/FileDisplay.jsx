import React from "react";

const FileDisplay = ({ file, audioStream, handleAudioReset }) => {
	return (
		<main className="flex-1 p-4 flex text-center flex-col gap-3 sm:gap-4 justify-center pb-40 w-fit max-w-full mx-auto sm:w-96">
			<h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
				Your <span className="text-blue-600 bold">File</span>
			</h1>

			<div className="mx-auto flex flex-col text-left my-4">
				<h3 className="font-semibold">Name</h3>
				<p>{file?.name || "Custom Audio Stream"}</p>
			</div>

			<div className="flex items-center justify-between gap-4 font-medium mt-4">
				<button
					className="text-black py-2 px-4 rounded-xl border-2 border-solid border-black bg-white duration-200 hover:bg-black/80 hover:text-white"
					onClick={handleAudioReset}
				>
					Reset
				</button>
				<button className="btn p-3 rounded-xl text-black flex items-center gap-2 font-medium">
					<p>Transcribe</p>
					<i class="fa-solid fa-headphones"></i>
				</button>
			</div>
		</main>
	);
};

export default FileDisplay;
