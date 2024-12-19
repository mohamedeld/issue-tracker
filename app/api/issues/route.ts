import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
  try{
    const body = await request.json();
    
  }catch(error){
    return new NextResponse(error instanceof Error ? error?.message : 'Something went wrong');
  }
}