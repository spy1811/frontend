import Head from 'next/head'
import Link from 'next/link'
import tw from 'twin.macro'
import { useRequireAuth } from "../services/useRequireAuth.js";

function Secure() {
    const { user } = useRequireAuth();

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <Head>
                <title>Home</title>
            </Head>

            <main tw="mx-auto max-w-sm text-center">
                <Link href="/">
                    <a tw="inline-block bg-blue-500 p-3 rounded block mt-4">Go back</a>
                </Link>
            </main>
        </div>
    )
}

export default Secure;