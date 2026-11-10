import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { model, prompt } = await req.json();
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API Key belum diatur di .env.local" }, { status: 500 });
    }

    const response = await fetch("https://openrouter.ai/api/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "AI All in One",
      },
      body: JSON.stringify({
        model,
        prompt,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error?.message || "Gagal membuat gambar" }, { status: response.status });
    }

    const url = data.data?.[0]?.url || data.url || "";
    return NextResponse.json({ url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
          }
