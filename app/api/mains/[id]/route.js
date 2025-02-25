import dbConnect from "@/lib/dbConnect";
import Main from "@/models/Mains";
import { NextResponse } from "next/server";
/*  items functions */

 export async function GET(request, { params }) {
    const { id } = params;
    await dbConnect();
    const mains = await Main.findOne({ _id: id });
    return NextResponse.json({ mains }, { status: 200 });
           
}  
export async function PUT(request, { params }) {
    const { id } = params;
    const { newComment: comment, newImagex: imagex, newFilesx: filesx } = await request.json();
    await dbConnect();
    await Main.findByIdAndUpdate(id, { comment, imagex, filesx});
    return NextResponse.json({ message: "Mains updated" }, { status: 200 });
}
 
