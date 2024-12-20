import IssueStatusBade from "@/app/components/IssueStatusBade"
import { Issue } from "@prisma/client"
import { Card, Flex, Heading, Text } from "@radix-ui/themes"
import Markdown from "react-markdown"


interface IProps{
  issue:Issue
}
const IssueDetailContent = ({issue}:IProps) => {
  return (
    <>
      <Heading>{issue?.title}</Heading>
      <Flex gap={"3"} my="2">
        <IssueStatusBade status={issue?.status} />
        <Text>{issue?.createdAt?.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <Markdown>{issue?.description}</Markdown>
      </Card>
    </>
  )
}

export default IssueDetailContent