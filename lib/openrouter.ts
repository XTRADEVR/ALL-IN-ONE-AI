export async function sendToAI(model: string, messages: { role: string; content: string }[]) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, messages }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error, cek API Key lu");
  return data.reply;
}

export async function generateImage(model: string, prompt: string) {
  const res = await fetch("/api/image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, prompt }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error, cek API Key lu");
  return data.url;
    }
