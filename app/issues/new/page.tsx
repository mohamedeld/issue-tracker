import dynamic from "next/dynamic"
import IssueFormSkeleton from "../_components/IssueFormSkeleton"

const IssueForm = dynamic(
  ()=> import("../_components/IssueForm"),
  {
    
    ssr:false,
    loading:()=> <p><IssueFormSkeleton/></p>
  }
)
const NewIssuePage = () => {
  return (
    <>
      <IssueForm/>
    </>
  )
}

export default NewIssuePage