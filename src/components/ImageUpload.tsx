"use client"

import { useToast } from '@chakra-ui/react';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import {uploadBytesResumable, ref, getDownloadURL, getStorage, deleteObject} from "firebase/storage"
import {storage} from "../config/firebase.config"
import { Button } from './ui/button';

interface ImageUploadProps{ 
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void; 
    value: string;
}

export const ImageUpload = ({
    disabled,
    onChange, 
    onRemove, 
    value,
}: ImageUploadProps) => {
    
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState<number>(0);

    const toast = useToast();

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if(!isMounted){
        return null;
    }
    
    const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file: File = e.target.files [0];
        setIsLoading (true);

        const uploadTask = uploadBytesResumable(ref( storage ,`JobCoverImage/${Date.now()}-${file?.name}`),
            file,
            { contentType: file?.type}
        );
        
        uploadTask.on("state_changed",
            (snapshot) => {
                setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            }, 
            (error) => {
                toast({
                    title: `${error.message}`,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    onChange (downloadUrl);
                    setIsLoading (false);
                    toast({
                        title: "Image Uploaded",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    })
                });
            }
        )};

        const onDelete = () => {
            onRemove(value);
            deleteObject(ref(storage, value)).then(() => {
                toast({
                    title: "Image Removed",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            })
        }

    return (
      <div>
        {value ? (
            <>
                <div className='h-full w-full relative aspect-video rounded-md flex items-center justify-center overflow-hidden'>
                    <Image
                        fill 
                        className='h-full w-full object-cover'
                        alt="Cover Image"
                        src={value}
                    />
                    <div className='absolute z-10 top-4 right-4 cursor-pointer'>
                        <Button size="icon" variant="destructive">
                            <Trash className='w-10 h-10 text-white bg-[#0b0b0f] p-2 rounded-md' onClick={onDelete} />
                        </Button>
                    </div>
                </div>
            </>
        ) : (
            <>
                <div className='h-full w-full relative aspect-video rounded-md flex items-center justify-center overflow-hidden border border-dashed bg-neutral-50'>
                    {isLoading ? (
                        <>
                            <p>
                                {`${progress.toFixed(2)}%`}
                            </p>
                        </>
                    ): (
                        <>
                            <label>
                                <div className='w-full h-full flex flex-col gap-2 items-center justify-center cursor-pointer text-neutral-500'>
                                    <ImagePlus className='w-10 h-10' />
                                    <p>Upload an Image</p>
                                </div>
                                <input type='file' accept='image/*' className='w-0 h-0' onChange={onUpload} />
                            </label>
                        </>
                    )}
                </div>
            </>
        )}
      </div>
    )
}