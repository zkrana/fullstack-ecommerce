import prismadb from "@/lib/prismadb";
import { BillboadClient } from "./components/client";


const BillboardsPage = async ({
     // Fetch all billboards data from db
     params
}: {
    params: {storeId: string}
}) => {

    const billboards = await prismadb.billboard.findMany({
        where:{
            storeId: params.storeId
        },
        orderBy:{
            createdAt: 'desc'
        }
    })
    
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboadClient data={billboards} />
            </div>
        </div>
     );
}
 
export default BillboardsPage;
