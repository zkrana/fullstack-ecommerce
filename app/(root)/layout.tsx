import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const { userId } = auth();

    if(!userId){
        redirect('/sign-in');
    }

    //Check user have store already
    const store = await prismadb.store.findFirst({
        where:{
            userId
        }
    });

    if(store){

        //After successfully sign in when we get user id, Now it's time to redirect user to the app=>Dashboard=>Store. Now go to this folder layout page.
        
        redirect(` ${store.id}`);
    }

    return(
        <div>
            {children}
        </div>
    )

}