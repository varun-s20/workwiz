"use client";
import React, { useState } from "react";
import  {Label}  from "../../../../../components/ui/label";
import {Button}  from "../../../../../components/ui/button";
import  {Input}  from "../../../../../components/ui/input";
import { cn } from "../../../../../lib/utils";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../../../components/ui/form";
import { useToast } from '@chakra-ui/react'
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { Button } from "@chakra-ui/react";


const formSchema = z.object({
        title : z.string().min(1, {message: "Job Title cannot be empty!"})
});

    
const JobCreatePage = () => {

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            title: "",
        },
    })

    const {isSubmitting, isValid} = form.formState;

    const toast = useToast();
    
        
    const onSubmit = async(values : z.infer<typeof formSchema>) => {
      try {
          const response = await axios.post("/api/jobs", values);
          console.log(response);
          toast({
            title: 'Job Created',
            position: 'top',
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
          router.push(`/dashboard/admin/jobs/${response.data.id}`)
      } catch (error) {
            console.log((error as Error)?.message)
      }
    }
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl m-4 md:p-8 bg-white h-full flex flex-col justify-center" 
    style={{
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2), 0 -10px 20px rgba(0, 0, 0, 0.1)"
    }}>
      <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200">
        Welcome to WorkWiz
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        What would you like to name your job? Don&apos;t worry you can change it later!
      </p>

      <Form {...form}>
      <form className="space-y-8 my-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField 
            control={form.control} 
            name="title" 
            render={({field}) => {
                return <FormItem>
                    <FormLabel className="text-lg">
                        Job Title
                    </FormLabel>
                    <FormControl>
                        <Input disabled={isSubmitting} placeholder="e.g. Full Stack Developer" {...field}  />
                    </FormControl>
                    <FormMessage className="text-red-800"/> 
                    <FormDescription className="text-gray-600">Role of this Job</FormDescription>
                </FormItem>;
            }}
        />
        <div className="flex items-center gap-x-2">
            <Link href={"/dashboard/admin/jobs"}>
                <Button type="button" variant="ghost" className="bg-gray-200 hover:bg-gray-300 ">
                    Cancel
                </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting || !isValid} className="bg-[#0b0b0f] text-white hover:bg-gray-700">
                Continue
            </Button>
        </div>
      </form>
      </Form>

    </div>
  );
}


export default JobCreatePage;