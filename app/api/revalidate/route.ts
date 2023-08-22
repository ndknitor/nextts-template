import { HttpStatusCode } from "axios";
import { NextApiRequest, NextApiResponse } from "next"

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const token = req.headers["Revalidate-Token"];
    if (token !== process.env.REVALIDATE_TOKEN) {
        return res.status(HttpStatusCode.Forbidden).json({ message: 'Invalid token', revalidated: false });
    }
    const paths = req.body as string[];
    if (!paths) {
        return res.status(HttpStatusCode.BadRequest).json({ message: "Paths is required", revalidated: false });
    }
    try {
        paths.map(path => {
            res.revalidate(path);
        });
        return res.status(HttpStatusCode.Ok).json({ revalidated: true, message: "Revalidate successfully" });
    } catch (err) {
        return res.status(HttpStatusCode.InternalServerError).send({ message: "Server error", revalidated: false });
    }
}