"use client"
import React from 'react'
import {zodResolver } from "@hookform/resolvers/zod"; 
import { useRouter } from "next/navigation";
import { useState } from "react";
import getGenerativeAIResponse from "../../../../../../../scripts/aistudio";
import { useForm } from "react-hook-form"; 
import {z} from "zod";
import { Button } from '../../../../../../../components/ui/button';
import {ComboBox} from '../../../../../../../components/ComboBox';
import { Lightbulb, Loader2, Pencil } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../../../../../../components/ui/form";
import  {Input}  from "../../../../../../../components/ui/input";
import { useToast } from '@chakra-ui/react';
import axios from "axios";
import { Job } from '@prisma/client';
import { cn } from '../../../../../../../lib/utils';
import { Textarea } from '@/components/ui/textarea';

interface ShortDescriptionProps {
    initialData: Job
    jobId: string;
}

const formSchema = z.object({
    short_description: z.string().min(1, { message: "short_description is required" }), });
    export const ShortDescription = ({ initialData, jobId }: ShortDescriptionProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();
    const [prompt, setPrompt] = useState("");
    const [isPrompting, setIsPrompting] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({ 
    resolver: zodResolver(formSchema),
        defaultValues: {
            short_description: initialData?.short_description || ""
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

    const handlePromptGeneration = async() => {
        try {
            setIsPrompting(true);
            const customPrompt = `Craft a concise job description for  ${prompt} position in fewer than 400 characters.`

            await getGenerativeAIResponse(customPrompt).then((data) => {
                form.setValue("short_description", data)
                setIsPrompting(false);
            });
        } catch (error) {
            console.log(error);
            toast({
                title: 'Something went wrong!',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const toggleEditing = () => setIsEditing((current) =>!current);

    return (
        <div className="mt-6 border bg-neutral-100 rounded-md p-4"> 
            <div className="font-medium flex items-center justify-between"> 
                Job Short Description
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

            {/* display the short_description if not editing */}
            {!isEditing && <p className='text-neutral-500'>{initialData?.short_description}</p> }

            {/* on editing display mode  */}
            
            {isEditing && ( <>
                <div className='flex items-center gap-2 my-2'>
                    <input type="text" placeholder='e.g Full Stack Developer' 
                        value={prompt} 
                        onChange={(e) => 
                            setPrompt(e.target.value)
                        } 
                        className='w-full p-2 rounded-md'
                    />
                    {isPrompting ? 
                        <>
                            <Button>
                                <Loader2 className='w-8 h-8 animate-spin rounded-md bg-[#0b0b0f] text-white p-1.5 hover:bg-gray-700' />
                            </Button>
                        </> : <>
                            <Button onClick={handlePromptGeneration}>
                                <Lightbulb className='w-8 h-8 p-1.5 rounded-md bg-[#0b0b0f] text-white hover:bg-gray-700' />
                            </Button>
                        </>}
                </div>

                <p>Notes</p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit (onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="short_description"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            disabled={isSubmitting}
                                            placeholder='Short description about the job'
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
            </>
            )}
        </div>
    )}