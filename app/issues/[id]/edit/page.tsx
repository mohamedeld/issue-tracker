import { notFound, redirect } from "next/navigation";
import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "../../_components/IssueFormSkeleton";

const IssueForm = dynamic(
  ()=> import("../../_components/IssueForm"),
  {
    
    ssr:false,
    loading:()=> <p><IssueFormSkeleton/></p>
  }
)

interface IProps{
  params:{
    id:string
  }
}

const EditIssuePage = async ({params}:IProps) => {
  const {id} = params;
  if (!id) {
    redirect("/");
  }
  if (isNaN(Number(id))) {
    notFound();
  }
  const issue = await prisma.issue.findUnique({
    where: {
      id: Number(id)
    }
  })
  if (!issue) {
    notFound();
  }
  return (
    <IssueForm issue={issue}/>
  )
}

export default EditIssuePage