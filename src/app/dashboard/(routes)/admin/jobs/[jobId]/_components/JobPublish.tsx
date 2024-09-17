"use client";

import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { FaTrash } from "react-icons/fa";

interface JobPublishProps{
    disabled: boolean;
    jobId: string;
    isPublished: boolean;
}

const JobPublish = ({disabled, jobId, isPublished}: JobPublishProps) => {
  
    const [isLoading, setIsLoading] = useState(false);
    
    const onClick = () => {
    };

    const onDelete = () => {};

    return (
    <div className='flex items-center gap-x-3'>
        <Button className="border-2 border-gray-300" onClick={onClick} disabled={disabled || isLoading}>
            {isPublished ? "Unpublish" : "Publish"}
        </Button>

        <Button variant={"destructive"} size={"icon"} disabled={isLoading} onClick={onDelete}>
            <FaTrash className='w-4 h-4' />
        </Button>
    </div>
  )
}

export default JobPublish