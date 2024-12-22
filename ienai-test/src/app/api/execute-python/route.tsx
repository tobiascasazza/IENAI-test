import { NextRequest, NextResponse } from 'next/server';
import { PythonShell } from 'python-shell';

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    const options = {
      pythonPath: './venv/Scripts/python.exe', 
      pythonOptions: ['-u'], 
    };

    const result = await PythonShell.runString(code, options);

    return NextResponse.json({ output: result || [] }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message || 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
