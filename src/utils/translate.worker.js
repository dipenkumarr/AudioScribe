import { pipeline, env } from "@xenova/transformers";

env.allowLocalModels = false;

class MyTranslationPipeline {
	static task = "translation";
	static model = "Xenova/nllb-200-distilled-600M";
	static instance = null;

	static async getInstance(progress_callback = null) {
		if (this.instance === null) {
			this.instance = await pipeline(this.task, this.model, {
				progress_callback,
			});
		}

		return this.instance;
	}
}

self.addEventListener("message", async (event) => {
	const { text, src_language, target_language } = event.data;
	let translator = await MyTranslationPipeline.getInstance((x) => {
		self.postMessage({ status: "PROGRESS", data: x });
	});

	let output = await translator(text, {
		tgt_lang: target_language,
		src_lang: src_language,
		callback_function: (x) => {
			self.postMessage({
				status: "UPDATE",
				output: translator.tokenizer.decode(x[0].output_token_ids, {
					skip_special_tokens: true,
				}),
			});
		},
	});

	self.postMessage({
		status: "COMPLETE",
		output,
	});
});
