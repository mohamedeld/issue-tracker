import { Status } from "@prisma/client"
import { Badge } from "@radix-ui/themes"


interface IProps{
  status:Status
}

const statusMap:Record<Status,{label:string,color:'red'|'violet' | 'green'}> = {
  OPEN:{label:'Open',color:'green'},
  IN_PROGRESS:{label:'In progress',color:'violet'},
  CLOSED:{label:'Closed',color:'red'}
}

const IssueStatusBade = ({status}:IProps) => {
  return (
    <Badge color={statusMap[status]?.color}>{statusMap[status]?.label}</Badge>
  )
}

export default IssueStatusBade