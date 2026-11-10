export interface AIModel {
  id: string;
  name: string;
  desc: string;
  icon: string;
}

export const CHAT_MODELS: AIModel[] = [
  { id: "openai/gpt-4o", name: "ChatGPT 4o", desc: "Paling pinter buat coding", icon: "⚡" },
  { id: "google/gemini-flash-1.5", name: "Gemini Flash", desc: "Paling cepet", icon: "🚀" },
  { id: "anthropic/claude-3.5-sonnet", name: "Claude 3.5", desc: "Paling enak buat nulis", icon: "✍️" },
  { id: "meta-llama/llama-3.1-70b-instruct", name: "Llama 3.1", desc: "Open source gratis", icon: "🦙" },
  { id: "openai/gpt-4o-mini", name: "ChatGPT Mini", desc: "Murah & Efisien", icon: "💡" },
];

export const IMAGE_MODELS: AIModel[] = [
  { id: "openai/dall-e-3", name: "DALL-E 3", desc: "Gambar paling bagus", icon: "🎨" },
  { id: "black-forest-labs/flux.1-pro", name: "Flux Pro", desc: "Gambar realistis", icon: "✨" },
  { id: "stabilityai/stable-diffusion-xl", name: "Stable Diffusion XL", desc: "Gratisan & Cepat", icon: "🖼️" },
];
