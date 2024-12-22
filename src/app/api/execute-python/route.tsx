import { NextRequest, NextResponse } from "next/server";
import { PythonShell } from "python-shell";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Invalid input: code is required and should be a string." },
        { status: 400 }
      );
    }
    console.log("Python path: ", path.resolve("./venv/bin/python"));
    const options = {
      pythonPath: path.resolve("./venv/bin/python3"),
      pythonOptions: ["-u"],
    };

    const result = await PythonShell.runString(code, options);

    return NextResponse.json({ output: result || [] }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error during code execution:", error);
    return NextResponse.json(
      {
        error:
          (error as Error).message ||
          "An unknown error occurred during code execution.",
        details: (error as Error).stack,
      },
      { status: 500 }
    );
  }
}
