'use client';
import { Button, Callout, Spinner, TextField } from '@radix-ui/themes'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import SimpleMDE from "react-simplemde-editor"

import {useForm,Controller } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios"
import "easymde/dist/easymde.min.css";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import z from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/api/issues/route';
import { Issue } from '@prisma/client';

interface IProps{
  issue?:Issue
}
const IssueForm = ({issue}:IProps) => {
  const router = useRouter();
  const {register,control,handleSubmit,formState:{isSubmitting,errors}} = useForm<z.infer<typeof createIssueSchema>>({
    mode:'onChange',
    resolver:zodResolver(createIssueSchema),
    defaultValues:{
      title:issue?.title,
      description:issue?.description
    }
  })

  async function onSubmit(values:z.infer<typeof createIssueSchema>){
    try{
      if(issue){
        const response = await axios.patch(`/api/issues/${issue?.id}`,values);
        if(response?.status === 200){
          toast.success("Updated Successfully");
          router.push("/issues");
          router.refresh();
        }
      }else{
        const response = await axios.post("/api/issues",values);
        if(response?.status === 201){
          toast.success("Created Successfully");
          router.push("/issues")
          router.refresh();
        }
      }
      
    }catch(error){
      console.log(error);
      toast.error(error instanceof Error ? error?.message : "Something went wrong")
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-xl space-y-3'>
        <TextField.Root placeholder="title" {...register("title")}/>
        {errors?.title && (
          <Callout.Root>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            {errors?.title?.message}
          </Callout.Text>
        </Callout.Root>
        
        )}
        <Controller
          name="description"
          control={control}
          render={({field})=> <SimpleMDE placeholder="Description…" {...field} />}
        />
        {errors?.description && (
          <Callout.Root>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            {errors?.description?.message}
          </Callout.Text>
        </Callout.Root>
        
        )}
        <Button>
          {isSubmitting ? (
            <>
            <Spinner />
            please wait
            </>
          ): issue ? "Update issue" :"Submit new issue"}
         </Button>
    </form>
  )
}

export default IssueForm