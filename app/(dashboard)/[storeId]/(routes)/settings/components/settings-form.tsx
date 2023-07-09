"use client"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { Trash } from "lucide-react"
import { Store } from "@prisma/client"
import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"

// Form Schema
const formSchema = z.object({
  name: z.string().min(2),
});


interface SettingsFormProps {
  initialData: Store;
};


// Create type for settingsFormvalues for not create it every single time, after this we can reuse settingsFormvalues.

type SettingsFormValues = z.infer<typeof formSchema>



export const SettingsForm: React.FC<SettingsFormProps> = ({
    initialData
  }) => {
    // AFter resolver create state

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Now create form and give this form settingsFormValues

    const form = useForm<SettingsFormValues>({

        //Open a object for resolver and formSchema to the zodResolver
        resolver: zodResolver(formSchema),

        //initialData is comes from settings page store where we pass initailData
        defaultValues: initialData
        // Now create state above
        
      });

    // Now create onSubmit function to perform delete action
    
    const onSubmit = async (data: SettingsFormValues) => {
        console.log(data);
    }

    // now create form markup after separator


    return ( 

        // Wrap them with fragment

        <>
            <div className="flex items-center justify-between">
                {/* This components except two props, This components will be reusable */}
                <Heading title="Store settings" description="Manage store preferences" />
                {/* Add button to delete store  */}
                <Button
                    disabled={loading}
                    variant="destructive"
                    size="sm"
                    onClick={() => {}}
                    >
                    <Trash className="w-4 h-4" />
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <div className="grid grid-cols-3 gap-8">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input disabled={loading} placeholder="Store name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <Button disabled={loading} className="ml-auto" type="submit">
                    Save changes
                </Button>
                </form>
            </Form>
            <Separator />
        </>
     );
}
