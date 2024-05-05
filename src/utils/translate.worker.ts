import { pipeline, Pipeline } from '@xenova/transformers';

// Assuming ExtendedTranslationPipeline is defined as follows:
interface ExtendedTranslationPipeline extends Pipeline {
    translate(text: string, options: { targetLanguage: string; sourceLanguage: string }): Promise<{ text: string }>;
}

// Type guard to check if the object is a valid ExtendedTranslationPipeline
function isTranslationPipeline(object: unknown): object is ExtendedTranslationPipeline {
    // Check for the presence of 'translate' method in the object safely
    return (object as ExtendedTranslationPipeline)?.translate !== undefined;
}

class MyTranslationPipeline {
    static model: string = 'Xenova/nllb-200-distilled-600M';
    static instance: ExtendedTranslationPipeline | null = null;

    static async getInstance(): Promise<ExtendedTranslationPipeline | null> {
        if (this.instance === null) {
            const pipelineInstance = await pipeline('translation', this.model);
            if (isTranslationPipeline(pipelineInstance)) {
                this.instance = pipelineInstance as ExtendedTranslationPipeline;
            } else {
                throw new Error("The pipeline instance does not support translation.");
            }
        }
        return this.instance;
    }
}

self.addEventListener("message", async (event: MessageEvent<{ text: string, tgt_lang: string, src_lang: string }>) => {
    const translator = await MyTranslationPipeline.getInstance();

    if (!translator) {
        console.error("Translator instance is null.");
        return;
    }

    try {
        const output = await translator.translate(event.data.text, {
            targetLanguage: event.data.tgt_lang,
            sourceLanguage: event.data.src_lang
        });

        self.postMessage({
            status: "complete",
            output: output.text
        });
    } catch (error: unknown) {
        console.error("Translation failed:", error);
        self.postMessage({ status: "failed", error: String(error) });
    }
});
