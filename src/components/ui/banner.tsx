import {cva, type VariantProps} from "class-variance-authority"
import {cn} from "../../lib/utils"
import { FiAlertTriangle } from "react-icons/fi";
import { FaRegCircleCheck } from "react-icons/fa6";
import React from "react";

const bannerVariants = cva("border text-center p-3 px-6 text-sm flex items-center w-full rounded-md shadow-md", 
    {
        variants: {
            variant: {
                warning: "bg-yellow-200/80 border-yellow-300 text-red-900",
                success: "bg-emerald-700/80 border-emerald-300 text-white"
            }
        },
        defaultVariants:{
            variant: "warning"
        }
    })

const iconMap = {
    warning: FiAlertTriangle,
    success: FaRegCircleCheck
}

interface BannerProps extends VariantProps<typeof bannerVariants>{
    label: string; 
}

export const Banner = ({variant, label}: BannerProps) => {
    const Icon = iconMap[variant || "warning"];
    return (
        <div className={cn(bannerVariants({variant}))}>
            <Icon className="h-4 w-4 mr-2"/>
            {label}
        </div>
    )
}