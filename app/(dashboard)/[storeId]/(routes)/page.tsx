
// Finally we are in store

import prismadb from "@/lib/prismadb";

// Check active store name by  passing props

interface DashboardPageProps {
    params: { storeId: string }
};

// Check active store name by  passing props
const DashboardPage: React.FC<DashboardPageProps> = async({
    params
}) =>{
    
    // Check active store name by  passing props
    const store = await prismadb.store.findFirst({
        where:{
            id: params.storeId
        }
    });

    return(
        <div>
            Active store: {store?.name}
        </div>
    )
}

export default DashboardPage;