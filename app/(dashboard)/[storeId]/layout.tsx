import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Navbar from "@/components/navbar"


// Now you came to this page after successfully loggedin, and successfully checked you have a store

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { storeId: string }
}) {

// Check user is authorised or not

    const { userId } = auth();

    if(!userId){
        redirect('/sign-in')
    }

// Find the store when user is loggedin with user id

    const store = await prismadb.store.findFirst({
        where:{
            id: params.storeId,
            userId
        }
    });

// If Store does not exist
    if(!store){
        redirect('/');
    }

// Now we confirmed that you have a store, It's time to render this return with children, and children will be (routes) => page.tsx page. Finally we came to the store.
// Now go to (routes) folder and then page.tsx page.
    return(
        <>
            <Navbar />
            { children }
        </>
    )
}