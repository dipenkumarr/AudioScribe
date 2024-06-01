import React, { useEffect, useRef, useState } from "react";

const HomePage = ({ setFile, setAudioStream }) => {
	const [recordingStatus, setRecordingStatus] = useState("inactive");
	const [audioChunks, setAudioChunks] = useState([]);
	const [duration, setDuration] = useState(0);

	const mediaRecorderRef = useRef(null);

	const mimeType = "audio/webm";

	async function startRecording() {
		let tempStream;

		console.log("Start Recording");

		try {
			const streamData = navigator.mediaDevices.getUserMedia({
				audio: true,
				video: false,
			});
			tempStream = streamData;
		} catch (error) {
			console.log(error.message);
			return;
		}

		setRecordingStatus("recording");

		const media = new MediaRecorder(tempStream, { type: mimeType });

		mediaRecorderRef.current = media;
		mediaRecorderRef.current.start();

		let localAudioChucks = [];
		mediaRecorderRef.current.ondataavailable = (e) => {
			if (typeof e.data === "undefined") {
				return;
			}
			if (e.data.size === 0) {
				return;
			}

			localAudioChucks.push(e.data);
		};
		setAudioChunks(localAudioChucks);
	}

	async function stopRecording() {
		setRecordingStatus("inactive");
		console.log("Stop Recording");

		mediaRecorderRef.current.stop();
		mediaRecorderRef.current.onstop = () => {
			const audioBlob = new Blob(audioChunks, { type: mimeType });
			setAudioStream(audioBlob);
			setAudioChunks([]);
			setDuration(0);
		};
	}

	useEffect(() => {
		if (recordingStatus === "inactive") {
			return;
		}
		const interval = setInterval(() => {
			setDuration((curr) => curr + 1);
		}, 1000);

		return () => clearInterval(interval);
	});

	return (
		<main className="flex-1 p-4 flex  text-center flex-col gap-3 sm:gap-4 md:gap-5 justify-center pb-40">
			<h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
				Audio<span className="text-blue-600 bold">Scribe.</span>
			</h1>

			<h3 className="font-medium md:text-lg">
				Record <span className="text-blue-400">&rarr;</span> Transcribe{" "}
				<span className="text-blue-400">&rarr;</span> Translate
			</h3>

			<button
				className="flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4 btn py-2.5 px-4 rounded-xl text-black"
				onClick={
					recordingStatus === "recording"
						? stopRecording
						: startRecording
				}
			>
				<p>
					{recordingStatus === "inactive"
						? "Record"
						: `Stop Recording`}
				</p>

				<div className="flex items-center gap-2">
					{duration !== 0 && <p className="text-sm">{duration}s</p>}
					<i
						className={
							"fa-solid fa-microphone " +
							(recordingStatus === "recording"
								? "text-rose-600"
								: "")
						}
					></i>
				</div>
			</button>

			<p className="text-base">
				Or{" "}
				<label className="text-blue-500 cursor-pointer hover:text-blue-800 duration-200">
					upload
					<input
						onChange={(e) => {
							const tempFile = e.target.files[0];
							setFile(tempFile);
						}}
						className="hidden"
						type="file"
						accept=".mp3,.wave"
					/>
				</label>{" "}
				a mp3 file
			</p>
		</main>
	);
};

export default HomePage;
