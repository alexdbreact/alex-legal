import dbConnect from "@/lib/dbConnect";
import Mains from "@/models/Mains";

import { NextResponse } from "next/server";
/*  items functions */

 export async function GET() {
    await dbConnect();
    const mains = await Mains.find({$or:[{start:"legal"},{start2:"legal"}]});
    return NextResponse.json({ mains });
           
}  

 

