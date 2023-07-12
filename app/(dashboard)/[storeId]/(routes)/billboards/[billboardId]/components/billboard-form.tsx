"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { Billboard } from "@prisma/client"
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
import { useOrigin } from "@/hooks/use-origin"
import ImageUpload from "@/components/ui/image-upload"

// Form Schema
const formSchema = z.object({
  label: z.string().min(2),
  imageUrl: z.string().min(1),
});

// Create type for BillboardFormvalues for not create it every single time, after this we can reuse BillboardFormvalues.

type BillboardFormValues = z.infer<typeof formSchema>

interface BillboardFormProps {
  initialData: Billboard | null;
};


export const BillboardForm: React.FC<BillboardFormProps> = ({
    initialData
  }) => {
    // AFter resolver create state

    // For ignore hydration error use const origin = useOrigin();
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? 'Edit billboard' : 'Create billboard';
    const description = initialData ? 'Edit a billboard.' : 'Add a new billboard';
    const toastMessage = initialData ? 'Billboard updated.' : 'Billboard created.';
    const action = initialData ? 'Save changes' : 'Create';

    // Now create form and give this form BillboardFormValues

    const form = useForm<BillboardFormValues>({

        //Open a object for resolver and formSchema to the zodResolver
        resolver: zodResolver(formSchema),

        //initialData is comes from settings page store where we pass initailData
        defaultValues: initialData || {
          label: '',
          imageUrl: ''
        }
        
      });

    // Now create onSubmit function to perform delete action
    
    const onSubmit = async (data: BillboardFormValues) => {
      try {
        setLoading(true);
        if (initialData) {
          await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data);
        } else {
          await axios.post(`/api/${params.storeId}/billboards`, data);
        }
        router.refresh();
        router.push(`/${params.storeId}/billboards`);
        toast.success(toastMessage);

      } catch (error: any) {
        toast.error('Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    // now create form markup after separator

    // Now create onSubmit function to perform delete action
    

    const onDelete = async () => {
      try {
        setLoading(true);
        await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
        router.refresh();
        router.push(`/${params.storeId}/billboards`);
        toast.success('Billboard deleted.');
      } catch (error: any) {
        toast.error('Make sure you removed all categories using this billboard first.');
      } finally {
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
            <div className="flex items-center justify-between pb-2">
                {/* This components except two props, This components will be reusable */}
                <Heading title={title} description={description} />
                {/* Add button to delete store  */}
                {initialData && (
                  <Button
                    disabled={loading}
                    variant="destructive"
                    size="sm"
                    onClick={() => setOpen(true)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-2 w-full">

              {/* After completing imageUpload page add this one here */}
              <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Background image</FormLabel>
                      <FormControl>
                        <ImageUpload 
                          value={field.value ? [field.value] : []} 
                          disabled={loading} 
                          onChange={(url) => field.onChange(url)}
                          onRemove={() => field.onChange('')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <div className="md:grid md:grid-cols-3 gap-8">
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Label</FormLabel>
                      <FormControl>
                        <Input disabled={loading} placeholder="Billboard label" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button disabled={loading} className="ml-auto" type="submit">
                {action}
              </Button>
            </form>
          </Form>
        </>
     );
}
