import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
const createIssueSchema = z.object({
  title:z.string().min(1).max(255),
  description:z.string().min(1).max(255),
})

export async function POST(request:NextRequest){
  try{
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if(!validation?.success){
      return NextResponse.json(validation?.error?.errors,{status : 400});
    }
    const issue = await prisma.issue.create({
      data:{
        title:body?.title,
        description:body?.description
      }
    });
    return NextResponse.json(issue,{status:201});
  }catch(error){
    return new NextResponse(error instanceof Error ? error?.message : 'Something went wrong');
  }
}