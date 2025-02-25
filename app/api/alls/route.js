import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Alls from "@/models/Alls";



/*  Ideas functions */

export async function GET() {
    await dbConnect();
    const alls = await Alls.find();
    return NextResponse.json({ alls });
}
 



 

