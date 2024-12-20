'use client'

import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

interface IProps {
  issueId: number
}

const DeleteIssueButton = ({ issueId }: IProps) => {
  const router = useRouter();
  const [loading,setLoading] = useState(false);

  async function handleDelete(){
    try{
      setLoading(true)
      const response = await axios.delete(`/api/issues/${issueId}`);
      if(response?.status === 200){
        toast.success("Deleted Successfully");
        setLoading(false)
        router.push("/issues/list");
        router.refresh();
      }
    }catch(error){
      toast.error(error instanceof Error ? error?.message : "something went wrong")
      setLoading(false)
    }
  }
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
        <Button mr="5" color="red">{
                  loading ? (
                    <>
                      <Spinner/>
                      Deleting...
                    </>
                  ):"Delete issue"
                }</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Delete Issue</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete this issue?
            
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" disabled={loading} color="red" onClick={handleDelete}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      
    </>
  )
}

export default DeleteIssueButton