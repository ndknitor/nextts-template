import { HttpStatusCode } from "fetcker";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const token = req.headers.get("Revalidate-Token");
    const body = { message: 'Invalid token', revalidated: false };
    if (token !== process.env.REVALIDATE_TOKEN) {
        return NextResponse.json(body, { status: HttpStatusCode.Forbidden });
    }
    const paths = (await req.json()) as string[];
    if (!paths) {
        body.message = "Paths is required";
        return NextResponse.json(body, { status: HttpStatusCode.BadRequest });
    }
    try {
        paths.map(path => {
            revalidatePath(path);
        });
        body.revalidated = true;
        body.message = "Revalidate successfully";
        return NextResponse.json(body, { status: HttpStatusCode.OK });
    } catch (err) {
        body.message = "Server error";
        return NextResponse.json(body, { status: HttpStatusCode.InternalServerError });
    }
}