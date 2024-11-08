"use client"
import React from 'react'
import {zodResolver } from "@hookform/resolvers/zod"; 
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form"; 
import {z} from "zod";
import { Button } from '../../../../../../../components/ui/button';
import {ComboBox} from '../../../../../../../components/ComboBox';
import { Pencil } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../../../../../../components/ui/form";
import  {Input}  from "../../../../../../../components/ui/input";
import { useToast } from '@chakra-ui/react';
import axios from "axios";
import { Job } from '@prisma/client';
import { cn } from '../../../../../../../lib/utils';

interface ShiftTimingFormProps {
    initialData: Job
    jobId: string;
}

let options = [
    {
        value: "full-time",
        label: "Full Time"
    },
    {
        value: "part-time",
        label: "Part Time"
    },
    {
        value: "contract",
        label: "Contract"
    }
]

const formSchema = z.object({
    shiftTimimg: z.string().min(1, { message: "shiftTimimg is required" }), });
    export const ShiftTimingForm = ({ initialData, jobId }: ShiftTimingFormProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({ 
    resolver: zodResolver(formSchema),
        defaultValues: {
            shiftTimimg: initialData?.shiftTimimg || ""
        }
    });

    const toast = useToast();
    
    const { isSubmitting, isValid } = form. formState;

    const onSubmit= async (values: z. infer<typeof formSchema>) => {
        try {
            const response = await axios.patch(`/api/jobs/${jobId}`, values);
            toast({
                title: 'Job updated succesfully!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            toggleEditing();
            router.refresh();
        } catch (error) {
            toast({
                title: 'Something went wrong!',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    };

    const toggleEditing = () => setIsEditing((current) =>!current);

    const selectedOption = options.find((option) => option.value === initialData.shiftTimimg);

    return (
        <div className="mt-6 border bg-neutral-100 rounded-md p-4"> 
            <div className="font-medium flex items-center justify-between"> 
                Job Shift Timing
                <Button onClick={toggleEditing} variant={"ghost"}> 
                    {isEditing ? ( 
                        <>Cancel</> 
                    ): (
                        <>
                        <Pencil className="w-4 h-4 mr-2" />
                            Edit
                        </>
                    )}
                </Button>
            </div>

            {/* display the shiftTimimg if not editing */}
            {!isEditing && <p className={cn("text-sm mt-2", !initialData?.shiftTimimg && "text-neutral-500 italic")}>{selectedOption?.label || "No Timing added"}</p> }

            {/* on editing display mode  */}
            
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit (onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="shiftTimimg"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <ComboBox 
                                            heading = "Timings"
                                            options={options}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='flex items-center gap-x-2 '>
                            <Button disabled={!isValid || isSubmitting} type="submit" className='bg-[#0b0b0f] text-white hover:bg-gray-700'>
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    )}