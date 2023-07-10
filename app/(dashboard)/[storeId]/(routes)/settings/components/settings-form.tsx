"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { Store } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"
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
import { AlertModal } from "@/components/modals/alert-modal"
import { ApiAlert } from "@/components/ui/api-alert"
import { useOrigin } from "@/hooks/use-origin"

// Form Schema
const formSchema = z.object({
  name: z.string().min(2),
});

// Create type for settingsFormvalues for not create it every single time, after this we can reuse settingsFormvalues.

type SettingsFormValues = z.infer<typeof formSchema>

interface SettingsFormProps {
  initialData: Store;
};


export const SettingsForm: React.FC<SettingsFormProps> = ({
    initialData
  }) => {
    // AFter resolver create state

    const origin = useOrigin();
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Now create form and give this form settingsFormValues

    const form = useForm<SettingsFormValues>({

        //Open a object for resolver and formSchema to the zodResolver
        resolver: zodResolver(formSchema),

        //initialData is comes from settings page store where we pass initailData
        defaultValues: initialData
        
      });

    // Now create onSubmit function to perform delete action
    
    const onSubmit = async (data: SettingsFormValues) => {
        try {
          setLoading(true);
          await axios.patch(`/api/stores/${params.storeId}`, data);
          router.refresh();
          toast.success('Store updated.');

        } catch (error: any) {
          toast.error('Something went wrong.');
        } finally {
          setLoading(false);
        }
        // Create Routes API for submit this form
    };

    // now create form markup after separator

    // Now create onSubmit function to perform delete action
    
    const onDelete = async () => {

        try{
            setLoading(true);
            axios.delete(`/api/stores/${params.storeId}`);
            router.refresh();
            router.push("/");
            toast.success("Store deleted successfully.");
        }
        catch (error){
            toast.error("Make sure you removed all product and categories first.")
        }
        finally{
            setLoading(false);
            setOpen(false);
        }

    }


    return ( 

        // Wrap them with fragment

        <>
        <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
        />
            <div className="flex items-center justify-between">
                {/* This components except two props, This components will be reusable */}
                <Heading title="Store settings" description="Manage store preferences" />
                {/* Add button to delete store  */}
                <Button
                    disabled={loading}
                    variant="destructive"
                    size="sm"
                    onClick={() => setOpen(true)}

                    // Now create API

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
            <ApiAlert 
                title="NEXT_PUBLIC_API_URL" 
                variant="public" 
                description={`${origin}/api/${params.storeId}`}
            />
            {/* Now go to again api alert */}
        </>
     );
}
