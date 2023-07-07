import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import StoreSwitcher from "@/components/store-switcher";
import { MainNav } from "@/components/main-nav";
import prismadb from "@/lib/prismadb";

    const Navbar = async () => {

    // Now pass the store to the store switcher 
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const stores = await prismadb.store.findMany({
        where: {
        userId,
        }
    });


    return(
        <div className="border-b">
            <div className=" flex h-16 items-center px-4">
                
                <StoreSwitcher items={stores} />

                {/*  Main Nav  */}

                <MainNav />

                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
}

export default Navbar