import prisma from '@/prisma/client'
import { Button, Table } from '@radix-ui/themes'
import React from 'react'
import IssueStatusBade from '../components/IssueStatusBade'
import IssueActions from '../components/IssueActions'
import Link from '../components/Link'

const IssuePage = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <div>
      <IssueActions/>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues?.length > 0  ? issues?.map(issue=>{
            return (
              <Table.Row key={issue?.id}>
              <Table.Cell>
                <Link href={`/issues/${issue?.id}`}>{issue?.title}</Link>
                <div className='block md:hidden'><IssueStatusBade status={issue?.status}/></div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBade status={issue?.status}/>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue?.createdAt?.toDateString()}</Table.Cell>
            </Table.Row>
            ) 
          }) : (
             <Table.Row>
             <Table.Cell>No items found</Table.Cell>
           </Table.Row>
          )}


        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default IssuePage