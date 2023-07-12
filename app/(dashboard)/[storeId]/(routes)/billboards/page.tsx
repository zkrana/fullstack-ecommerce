import { BillboadClient } from "./components/client";


const BillboardsPage = () => {

    // Fetch all billboards data from db
    
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboadClient />
            </div>
        </div>
     );
}
 
export default BillboardsPage;
