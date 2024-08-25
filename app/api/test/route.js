import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json({
    message: "Hello World",
  });
}

export async function POST(request) {
  try {
    // Parse the JSON body of the request
    const body = await request.json();

    // You can log the parsed body to see the incoming data
    console.log(body);

    // Process the data or perform any logic needed

    // Return a JSON response
    return NextResponse.json({
      message: "Hello World",
      data: body, // Optionally return the received data
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      {
        message: "Error processing request",
        error: error.message,
      },
      { status: 500 }
    );
  }
}