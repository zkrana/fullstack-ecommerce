"use client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Billboard } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

// receive props from BillboardPage
interface BillboadClientProps{
    data: Billboard[]
}


export const BillboadClient: React.FC<BillboadClientProps> = ({
    data
    // Now you have all billboard dynamic number in data variable.

}) => {

    const router = useRouter();
    const params = useParams();
    return ( 
        <>
            <div className="flex items-center justify-between">
                <Heading

                // Show the billboard length you have in your store
                
                 title={`Billboards (${data.length})`}
                 description="Manage billboards for your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}> 
                    <Plus className="mr-2 w-4 h-4" />
                    Add New    
                </Button>
            </div>
            <Separator />
        </>
     );
}
