import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const handleError = (error: unknown) => {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: JSON.stringify(error.issues.map((issue) => issue.message)) },
      { status: 400 },
    );
  } else if (error instanceof PrismaClientKnownRequestError) {
    return NextResponse.json(
      { error: JSON.stringify(error.message) },
      { status: 400 },
    );
  }
  return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 });
};
