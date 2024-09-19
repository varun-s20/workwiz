"use client"
import React from 'react'
import {zodResolver } from "@hookform/resolvers/zod"; 
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form"; import {z} from "zod";
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../../../../../../components/ui/form";
import  {Input}  from "../../../../../../../components/ui/input";
import { useToast } from '@chakra-ui/react';
import axios from "axios";

interface TitleFormProps {
    initialData: {
        title: string;
    };
    jobId: string;
}

const formSchema = z.object({
title: z.string().min(1, { message: "Title is required" }), });
export const TitleForm = ({ initialData, jobId }: TitleFormProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({ 
    resolver: zodResolver(formSchema),
    defaultValues: initialData
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

    return (
        <div className="mt-6 border bg-neutral-100 rounded-md p-4"> 
            <div className="font-medium flex items-center justify-between"> 
                Job Title
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

            {/* display the title if not editing */}
            {!isEditing && <p className="text-sm mt-2">{initialData.title}</p> }

            {/* on editing display mode  */}
            
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit (onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g 'Full-stack developer'"
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