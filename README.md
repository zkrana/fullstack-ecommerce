This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.






## Package Installation

First Step: npx create-next-app@latest my-app --typescript --tailwind --eslint

Second Step: npx shadcn-ui@latest init

Third Step: npx shadcn-ui@latest add button

Fourth Step: npm install @clerk/nextjs

## Now Follow this link for authetication

https://clerk.com/docs/nextjs/get-started-with-nextjs


## wrap entire laout jsx into <ClerkProvider> Like this:
    <ClerkProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
    </ClerkProvider>

## Add middleware from clerk docs site 
 and copy middleware code and paste it on middleware page


## Craete auth folder to app folder
Like: (auth) => routes => sign-up => [[ ...sign-up ]]  => page.tsx

cope code from clerk docs to page.tsx page.

Do it for sign in also

Like: (auth) => routes => sign-in => [[ ...sign-in ]]  => page.tsx

cope code from clerk docs to page.tsx page.

## Update your environment variables

Next, add environment variables for the signIn , signUp and afterSignUp , afterSignIn paths:

==> Now your sign in and sign up authentication is ready, If you want to make it center 
create a layout page for all group page like:
(routes) => layout.tsx it will cover all pages under routes folder. Now you can control your all page layout. Like this

export default function AuthLayout({
    children
}:{
    children: React.ReactNode
}) {
    return(
        <div className=" w-full h-full flex justify-center items-center">
            {children}
        </div>
    )
}

## Now try to login or sign up

after sign in by google or your email it will redirect you to root folder page.tsx. It's your admin main page.

## Add userbutton in after login dahsboard on your root pag, Like:
        <UserButton afterSignOutUrl="/"/>

## Now create Modal for adding store on dashboard

 Step 1: npx shadcn-ui@latest add dialog
for adding dialog popup.

## Now create your Modal in Components => ui folder;

## Now go to your root page and this Modal here.

## Use zustand for global state management =>  npm install zustand

## After Installaing Create a folder name hooks and then create a file name use-store-modal.tsx
Now work on this page.

## After completing this page craete a folder namee  modals in components folder and the create a file name store-modal.tsx


## after completinf this page create a folder in main folder name providers then create file name modal-provider.tsx

## After completing this page import modal provider in app layout.tsx page.


## Now add Modal by import modal to the root page.tsx page.

## Now add form from shadcn by using this command::: npx shadcn-ui@latest add form

## Now add input from shadcn by using this command::: npx shadcn-ui@latest add input

## Now create form schema on store-modal.tsx page
Now when you work on this page please make sure you have this packe installed in package.json => @hookform/resolvers and react-hook-form dependencies.

after completing the dynamic form then Install prisma to sent data to db

## Install Prisma Dev dependencies: npm i -D prisma

## Install Prisma Dev dependencies: npm install @prisma/client

## Now initialize prisma by this command: npm prisma init

## Now create a prisma page in lib folder.

## After complete prisma then create a account on planetscale website: https://planetscale.com
create Databasae there and add prisma connect in env file.

Now Add this code from planetscale to prisma.schema page 
  provider = "mysql"
  url      = env("DATABASE_URL")
  relationMode = "prisma"

  ## Now create data table on db at prisma.schema page, Like:

  model Store{
  id          String @id @default(uuid())
  name        String
  userId      String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

## Now generate command for generate them on planet scale: npx prisma generate

## Check npw db string si successfully connecctedd or not by this command: npx prisma db push 

NB: If you get any error please check your database url on env file.


## It's time to call PAI route to send date to the databse. Go to App folder create a folder name api => create another folder name stores => create a file name route.ts.

after completing this page go to component folder to store modal page now create state for manage user request handle.Like:
    const [loading, setLoading] = useState(false)

after apply it on button and input Now install a package for axios

## Install axios: npm i axios

## Now complete onSubmit () on store modal page.

after completing this

## Install toast package : npm i react-hot-toast

## Now create a toast provider page on prividers folder
after complete this page
## Now add toaster in app layout page.
now you can add toat message

## Now add toast to the store-modal page


## It's time to create your Dashboard.
create a folder name (dashboard) on app folder, Now create another folder name [storeId] it's a convention of NEXT 13, it will automatically take store id.
Now create a layout.tsx for layout of all store.

After completing layout page Nopw craete

## (routes) folder to storeId folder then create page.tsx

Nopw write the basic code of page.tsx page.

## Now create authenticated layout for root folder name layout.tsx

Now create (routes) folder on root folder then move page.tsx to the routes folder.


## After completing them, Now: Reset your prisma mysql database: npx prisma migrate reset
## Again command: npx prisma generate
## Again command: npx prisma db push

## Now go to componennts  => Modal =>Store modal fix this : 
 window.location.assign(`/${response.data.id}`);

## Now go to dashboard page to Check active store name by  passing props


## It's time to work with navigation:

Go to dashboard layout for creating navbar.

## create navbar on components in folder below ui now create navbar.tsx page.

after basic header is complete let's create a MainNav route on components.

## create MainNav on components in folder below ui now create main-nav.tsx page.

## Now create a store switcher as a combo box by this command: npx shadcn-ui@latest add popover  and this: npx shadcn-ui@latest add command

## Now create store switcher in component store-switcher.tsx
 after completing switcher page now create 

 ## Create a folder name settings in dashboard routes folder name page.tsx

 ## Now create a folder to the settings folder name components and then create a file name settings-from.tsx

## Let's Create heading.tsx page in components ui folder.

## now Run this command: npx shadcn-ui@latest add separator

## Go to settings-from.tsx this page, make form schema funciton

## Create [storeId] folder in API => stores folder. Now create route.ts for indivisual id.
Create 2 routes first one is patch for update the store.
 Second id delete for delete store.

After completing this, Now go to settings-form page for update the actual delete and update operation

## now create a alert-modal.tsx in components => modals folder.

add this on settings form page as a component <AlertModal />

After this add onDelete method to perform delete operation on settings form page.

After Alert Modal is done

## Command for alert: npx shadcn-ui@latest add alert

## now create a page api-alert.tsx to the components => ui folder

## Command for alert: npx shadcn-ui@latest add badge

## create a hooks in hooks folder name use-origin.tsx

## After completing this craete billboard db table in prisma.schema file

## After adding billboard schema now command: npx prisma generate after that another command: npx prisma db push












