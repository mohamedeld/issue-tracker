import { notFound, redirect } from "next/navigation";
import IssueForm from "../../_components/IssueForm"
import prisma from "@/prisma/client";

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