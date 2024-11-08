import { db } from '@/lib/db';
import { Icon } from '@chakra-ui/react';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import JobPublish from "./_components/JobPublish";
import {Banner} from "../../../../../../components/ui/banner"
import {TitleForm} from "./_components/TitleForm"
import {ImageForm} from "./_components/ImageForm"
import {CategoryForm} from "./_components/CategoryForm"
import {ShiftTimingForm} from "./_components/ShiftTimingForm"
import {ShortDescription} from "./_components/ShortDescription"
import {JobDescription} from "./_components/JobDescription"
import {AttachmentsForm} from "./_components/AttachmentsForm"
import {IconsBadge} from "../../../../../../components/IconsBadge"
import { LayoutDashboard } from 'lucide-react';

const JobDetailsPage = async ({params}: {params : {jobId :string}}) => {

//   verify user id
    const validObjectIdRegex = /^[0-9a-fA-F]{24}$/;
    if(!validObjectIdRegex.test(params.jobId)){
        return redirect("/dashboard/admin/jobs");
    }

    const {userId} = auth();

    if(!userId){
        return redirect("/dashboard");
    }

    const job = await db.job.findUnique({
        where: {
            id: params.jobId,
            userId
        }
    })

    const categories = await db.category.findMany({
        orderBy: {name: "asc"}
    })

    if(!job){
        return redirect("/dashboard/admin/jobs");
    }
    
    const requiredFields = [job.title, job.description, job.imageUrl, job.categoryId];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionText = `(${completedFields}/${totalFields})`;

    const isComplete = requiredFields.every(Boolean);   
    const jobWithAttachments = { ...job, attachments: [] };

  return (
    <div className='p-8'>
        <Link href={"/dashboard/admin/jobs"}>
            <div className='flex items-center gap-2 text-sm text-neutral-500'>
                <IoIosArrowRoundBack className='text-lg'/>
                Back
            </div>
        </Link>

        {/* title  */}
        <div className='flex items-center justify-between my-4'>
            <div className='flex flex-col gap-y-2'>
                <h1 className='text-3xl font-semibold'>
                    Job Setup
                </h1>
                <span className='text-xs text-neutral-500'>
                    Complete All Fields {completionText}
                </span>
            </div>

            {/* action button  */}
            <JobPublish 
                jobId={params.jobId}
                isPublished={job.isPublished}
                disabled={!isComplete}
            />

        </div>
        {!job.isPublished && 
            <Banner
                variant="warning"
                label="This job is unpublished. It will not be visible in the jobs list."
            />
        }

        {/* container layout  */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
            {/* left container */}
            <div>
                <div className='flex items-center gap-x-2'>
                <IconsBadge icon={LayoutDashboard} />
                <h2 className='text-lg text-slate-900'>Customize your job</h2>
                </div>

                {/* title form */}
                <TitleForm initialData={job} jobId={job.id} />

                {/* category form  */}
                <CategoryForm initialData={job} jobId={job.id} options={categories.map((category) => ({
                    label: category.name,
                    value: category.id
                }))} />

                {/* cover image  */}
                <ImageForm initialData={job} jobId={job.id} />

                {/* Job description  */}
                <ShortDescription initialData={job} jobId={job.id} />

                {/* shift timing mode */}
                <ShiftTimingForm initialData={job} jobId={job.id}  />

                {/* data table  */}
            </div>
            
            {/* right container */}
            
            <div>
                <AttachmentsForm initialData={jobWithAttachments} jobId={job.id} />
            </div>

            {/* description */}
            <div className='col-span-2'>
                <JobDescription initialData={job} jobId={job.id} />
            </div>
            
        </div>
    </div>
  )
}

export default JobDetailsPage