import prisma from "@/prisma/client";
import { notFound, redirect } from "next/navigation";

interface IProps{
  params:{
    id:string
  }
}

const IssueDetailPage = async ({params}:IProps) => {
  const {id} = params;
  if(!id){
    redirect("/");
  }
  if(typeof id !== 'number'){
    notFound();
  }
  const issue = await prisma.issue.findUnique({
    where:{
      id:Number(id)
    }
  })
  if(!issue){
    notFound();
  }
  return (
    <div>
      <p>{issue?.title}</p>
      <p>{issue?.description}</p>
      <p>{issue?.status}</p>
      <p>{issue?.createdAt?.toDateString()}</p>
    </div>
  )
}

export default IssueDetailPage