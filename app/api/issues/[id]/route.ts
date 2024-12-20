import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server"
import { createIssueSchema } from "../route";

interface IParams{
  params:{
    id:string
  }
}
export async function PATCH(req:NextRequest,{params}:IParams){
  try{
    const {id} = params;
    const issue = await prisma.issue.findUnique({
      where:{
        id:Number(id)
      }
    })
    if(!issue){
      return NextResponse.json({error:"Issue not found"},{status : 401});
    }
    const body = await req.json()
    const validation = createIssueSchema.safeParse(body);
    if(!validation?.success){
      return NextResponse.json(validation?.error?.errors,{status : 400});
    }
    const updatedIssue = await prisma.issue.update({
      where:{
        id:Number(id)
      },
      data:{
        title:body?.title,
        description:body?.description
      }
    })
    return NextResponse.json(updatedIssue,{status:200})
  }catch(error){
    return new NextResponse(error instanceof Error ? error?.message : 'Something went wrong');
  }
}

export async function DELETE(req:NextRequest,{params}:IParams){
  try{
    const {id} = params;
    const issue = await prisma.issue.findUnique({
      where:{
        id:Number(id)
      }
    })
    if(!issue){
      return NextResponse.json({error:"Issue not found"},{status : 401});
    }
    
    const DeleteIssue = await prisma.issue.delete({
      where:{
        id:Number(id)
      }
    })
    return NextResponse.json(DeleteIssue,{status:200})
  }catch(error){
    return new NextResponse(error instanceof Error ? error?.message : 'Something went wrong');
  }
}