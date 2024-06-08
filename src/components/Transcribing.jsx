import React from "react";

const Transcribing = ({ downloading }) => {
	return (
		<div className="flex items-center flex-col justify-center gap-10 mg:gap-14 py-24 text-center">
			<div className="flex flex-col gap-2 sm:gap-4">
				<h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
					<span className="text-blue-600 bold">File</span>
				</h1>
			</div>

			<div className="flex flex-col gap-2 sm:gap-4 max-w-[500px] mx-auto w-full">
				{/* {[0, 1, 2].map((val) => {
					return (
						<div
							key={val}
							className={
								"rounded-full h-2 sm:h-3 bg-slate-400 loading " +
								`loading${val}`
							}
						></div>
					);
				})} */}
				<i className="fa-solid fa-gear text-3xl animate-spin mt-4"></i>
			</div>
		</div>
	);
};

export default Transcribing;
