import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      message:
        "Disabled on Vercel: claude-code requires a local executable and cannot run in serverless.",
    },
    { status: 501 }
  );
}

export async function GET() {
  return NextResponse.json(
    {
      ok: false,
      message:
        "Disabled on Vercel: claude-code requires a local executable and cannot run in serverless.",
    },
    { status: 501 }
  );
}
