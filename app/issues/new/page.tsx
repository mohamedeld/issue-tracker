'use client';
import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import {useForm } from "react-hook-form";
import "easymde/dist/easymde.min.css";

interface IssueForm{
  title:string;
  description:string;
}

const NewIssuePage = () => {
  const {register,handleSubmit,formState:{isSubmitting,errors}} = useForm<IssueForm>({
    mode:'onChange'
  })
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root placeholder="title"/>
        <SimpleMDE placeholder="Description…" />
        <Button>Submit new issue</Button>
    </div>
  )
}

export default NewIssuePage