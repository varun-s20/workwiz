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
import { Copy, Lightbulb, Loader2, Pencil } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../../../../../../components/ui/form";
import  {Preview}  from "../../../../../../../components/ui/preview";
import { useToast } from '@chakra-ui/react';
import axios from "axios";
import { Job } from '@prisma/client';
import { cn } from '../../../../../../../lib/utils';
import { Textarea } from '../../../../../../../components/ui/textarea';
import { Editor } from '../../../../../../../components/ui/editor';

interface JobDescriptionProps {
    initialData: Job
    jobId: string;
}

const formSchema = z.object({
    description: z.string().min(1, { message: "description is required" }), });
    export const JobDescription = ({ initialData, jobId }: JobDescriptionProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();
    const [rollName, setRollName] = useState("");
    const [skills, setSkills] = useState("");
    const [aiValue, setAiValue] = useState("");
    const [isPrompting, setIsPrompting] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({ 
    resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData?.description || ""
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
            const customPrompt = `Could you please drafta job requirements document for the position of ${rollName}? The job description should include roles and responsibilites, key headtures, and details about the role. The required skills should include proficiency in ${skills}. Additionally, you can list any optional skill related to the job.`

            await getGenerativeAIResponse(customPrompt).then((data) => {
                data= data.replace(/^'|'$/g, "");
                let cleanedText = data.replace(/[\*\#]/g, "");
                // form.setValue("description", cleanedText)
                setAiValue(cleanedText)
                setIsPrompting(false);
            })

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

    const onCopy = () => {
        navigator.clipboard.writeText(aiValue);
        toast({
            title: 'Copied to Clipboard',
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    }

    const toggleEditing = () => setIsEditing((current) =>!current);

    return (
        <div className="mt-6 border bg-neutral-100 rounded-md p-4"> 
            <div className="font-medium flex items-center justify-between"> 
                Job Description
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

            {/* display the description if not editing */}
            {!isEditing && (
                <div className={cn("text-sm mt-2", !initialData.description && "text-neutral-500 italic")}>
                    {!initialData.description && "No Description"}
                    {initialData.description && (
                        <Preview value={initialData.description} />
                    )}
                </div>
            )}

            {/* on editing display mode  */}
            
            {isEditing && ( <>
                <div className='flex items-center gap-2 my-2'>
                    <input type="text" placeholder='e.g Full Stack Developer' 
                        value={rollName} 
                        onChange={(e) => 
                            setRollName(e.target.value)
                        } 
                        className='w-full p-2 rounded-md'
                    />
                    <input type="text" placeholder='Required Skills' 
                        value={skills} 
                        onChange={(e) => 
                            setSkills(e.target.value)
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

                <p className='text-xs text-gray-500 pb-4 text-right'>
                    Note: Professional Name & Required Skills delimetted by comma
                </p>

                {aiValue && (
                    <div className='w-full h-96 max-h-96 rounded-md bg-white overflow-y-scroll p-3 relative mt-4 text-gray-400'>
                        {aiValue}

                        <Button className='absolute top-3 right-3 z-10' variant={"outline"} size="icon" onClick={onCopy}>
                            <Copy className='w-4 h-4' />
                        </Button>
                    </div>
                )}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit (onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Editor {...field} />
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