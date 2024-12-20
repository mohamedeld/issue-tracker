import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

interface IProps{
  href:string
}

const EditIssueButton = ({href}:IProps) => {
  return (
    <Button> <Pencil2Icon/>
    <Link href={href}>Edit issue</Link>
   </Button>
  )
}

export default EditIssueButton