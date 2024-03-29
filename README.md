This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Before you getting started
First you have create .env.local and login at spotify developer to get access key to access you spotify account. Then you can write this in you .env.local file

        1. NEXT_AUTH=http://localhost:3000
        2. NEXT_PUBLIC_CLIENT_ID=YOUR_CLIENT_ID
        3. NEXT_PUBLIC_CLIENT_SECRET=YOUR_CLIENT_SECRET
        4.JWT_SECRET=some_super_secret_value

## How deploy in vercel
First of all you have create account in vercel and connect you github, gitlab or bitbucket and after that you can create new project and deploy you first web. But in this case you is diffrent you have create environment variable.

        1. NEXTAUTH_URL=YOUR_DOMAIN
        2. NEXT_PUBLIC_CLIENT_ID=YOUR_CLIENT_ID
        3. NEXT_PUBLIC_CLIENT_SECRET=YOUR_CLIENT_SECRET
        4. JWT_SECRET=some_super_secret_value 

You can put all that to environment variables but for number one you have set to you domain.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
