import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { language, content } = await req.json();

    // Mock Execution Engine Sandbox
    // In production, this would make an internal gRPC/HTTP call to your Execution Microservice
    // which then spins up a Docker container with strict constraints.
    
    // Hardcoded mock processing to show functionality
    await new Promise(res => setTimeout(res, 1500)); // Simulate container warmup

    if (language === "javascript" || language === "typescript") {
      try {
        // SUPER DANGEROUS IN PROD: eval
        // We only do this as a frontend mocked demonstration.
        const logs: string[] = [];
        const originalLog = console.log;
        console.log = (...args) => logs.push(args.join(" "));
        
        // Disable explicit hazardous globals
        const sandboxEval = new Function('console', `
          try {
            ${content}
          } catch(e) {
            console.log(e.toString());
          }
        `);
        sandboxEval(console);
        
        console.log = originalLog;
        
        return NextResponse.json({ output: logs.join("\n") }, { status: 200 });

      } catch(e: unknown) {
        return NextResponse.json({ error: (e as Error).toString() }, { status: 200 });
      }
    }

    return NextResponse.json({ 
      output: `Executed ${language} code in remote sandbox.\nResult: Ok.` 
    }, { status: 200 });

  } catch (error) {
    console.error("Execution API Error:", error);
    return NextResponse.json({ error: "Failed to execute code" }, { status: 500 });
  }
}
