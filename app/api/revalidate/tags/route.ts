import { HttpStatusCode } from "fetcker";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const token = req.headers.get("Revalidate-Token");
    const body = { message: 'Invalid token', revalidated: false };
    if (token !== process.env.REVALIDATE_TOKEN) {
        return NextResponse.json(body, { status: HttpStatusCode.Forbidden });
    }
    const tags = (await req.json()) as string[];
    if (!tags) {
        body.message = "Tags is required";
        return NextResponse.json(body, { status: HttpStatusCode.BadRequest });
    }
    try {
        tags.map(tag => {
            revalidateTag(tag);
        });
        body.revalidated = true;
        body.message = "Revalidate successfully";
        return NextResponse.json(body, { status: HttpStatusCode.OK });
    } catch (err) {
        body.message = "Server error";
        return NextResponse.json(body, { status: HttpStatusCode.InternalServerError });
    }
}