"use client"

import { useState } from "react";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

interface SettingsformProps{
    initialData: Store;
}

// Form Schema

const formSchema = z.object({
    name: z.string().min(1),
})

// Create type for settingsFormvalues for not create it every single time, after this we can reuse settingsFormvalues.

type SettingsformValues = z.infer<typeof formSchema>;



export const Settingsform: React.FC<SettingsformProps> = ({
    initialData
}) => {
    // AFter resolver create state

    const  [open, setopen] = useState(false)
    const [loading, setLoading] = useState(false)

    // Now create form and give this form settingsFormValues

    const form = useForm<SettingsformValues>({

        //Open a object for resolver and formSchema to the zodResolver
        resolver: zodResolver(formSchema),

        //initialData is comes from settings page store where we pass initailData

        defaultValues: initialData  
        // Now create state above

    })

    // Now create onSubmit function to perform delete action
    
    const onSubmit = async (data: SettingsformValues) =>{
        console.log(data);
    }

    // now create form markup after separator


    return ( 

        // Wrap them with fragment

        <>
            <div className="flex items-center justify-between">
                {/* This components except two props, This components will be reusable */}
                <Heading
                title="Settings"
                description="Manage store preferences"
                />
                {/* Add button to delete store  */}
                <Button
                variant="destructive"
                size="icon"
                onClick={() => {}}
                >
                    <Trash className="w-4 h-4" />
                </Button>
            </div>
            <Separator />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                        control={form.control}
                        name="name"
                        render={ ( {field} ) =>(
                            <FormItem>
                                <FormLabel> Name </FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Store name" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                         />
                    </div>
                </form>
            </Form>
        </>
     );
}
