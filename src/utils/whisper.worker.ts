import { pipeline, Pipeline } from '@xenova/transformers';
import { MessageTypes } from './presets';

interface TranslationRequestData {
    text: string;
    tgt_lang: string;
    src_lang: string;
}

// Assuming 'translation' task uses a standard pipeline which has a method we'll call 'translate'
interface ASRPipeline extends Pipeline {
    translate(text: string, options: { targetLanguage: string; sourceLanguage: string }): Promise<{ text: string }>;
}

class MyTranslationPipeline {
    static model: string = 'Xenova/nllb-200-distilled-600M';
    static instance: ASRPipeline | null = null;

  static async getInstance(): Promise<ASRPipeline | null> {
    if (this.instance === null) {
      this.instance = (await pipeline(
        "translation",
        this.model
      )) as unknown as ASRPipeline;
    }
    return this.instance;
  }
}

self.addEventListener(
  "message",
  async (event: MessageEvent<TranslationRequestData & { type: string }>) => {
    if (event.data.type !== MessageTypes.INFERENCE_REQUEST) return;

    const translator = await MyTranslationPipeline.getInstance();

    if (!translator) {
      console.error("Translator instance is null.");
      return;
    }

    console.log(event.data);

    try {
      const output = await translator.translate(event.data.text, {
        targetLanguage: event.data.tgt_lang,
        sourceLanguage: event.data.src_lang,
      });

      console.log("Translation output:", output);

      self.postMessage({
        status: "complete",
        output: output.text,
      });
    } catch (error: unknown) {
      console.error("Translation failed:", error);
      self.postMessage({
        status: "failed",
        error: (error as Error).message || String(error),
      });
    }
  }
);
