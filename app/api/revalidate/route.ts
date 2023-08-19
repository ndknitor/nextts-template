import { HttpStatusCode } from "axios";
import { NextApiRequest, NextApiResponse } from "next"

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const token = req.headers["Revalidate-Token"];
    if (token !== process.env.REVALIDATE_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    const path = req.query["path"];
    if (!path) {
        return res.status(HttpStatusCode.BadRequest).json({ message: "Path is required" });
    }
    try {
        await res.revalidate(path as string);
        return res.json({ revalidated: true });
    } catch (err) {
        return res.status(500).send('Error revalidating');
    }
}