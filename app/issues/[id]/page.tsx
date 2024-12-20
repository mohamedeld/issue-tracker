import IssueStatusBade from "@/app/components/IssueStatusBade";
import prisma from "@/prisma/client";
import Markdown from 'react-markdown'

import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound, redirect } from "next/navigation";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import EditIssueButton from "./_components/editIssueButton";
import IssueDetailContent from "./_components/IssueDetailContent";
import DeleteIssueButton from "../_components/DeleteIssueButton";
interface IProps {
  params: {
    id: string
  }
}

const IssueDetailPage = async ({ params }: IProps) => {
  const { id } = params;
  if (!id) {
    redirect("/");
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
    <Grid columns={{
      initial:"1",
      md:"2"
    }} gap="5">
      <Box>
        <IssueDetailContent issue={issue}/>
      </Box>
      <Box>
        
          
       <EditIssueButton href={`/issues/${issue?.id}/edit`}/>
      
         <DeleteIssueButton issueId={issue?.id}/>
        
      </Box>
    </Grid>
  )
}

export default IssueDetailPage