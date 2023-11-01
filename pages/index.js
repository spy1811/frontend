import Head from 'next/head'
import { useAuth } from "../services/useAuth.js";
import tw from 'twin.macro'
import Link from 'next/link'

export default function Home() {
  const { user, logout } = useAuth();
  return (
    <div className="container">
      <Head>
        <title>Home</title>
      </Head>

      <main tw="mx-auto max-w-sm text-center">
        <div tw="mt-4">
          {user && user.email || user == false && 'Logged out' || user == null && 'Loading...'}
        </div>
        {user && (
          <button onClick={() => logout()} tw="bg-blue-500 p-3 rounded block w-full mt-4">
            Logout
          </button>
        ) || (
            <Link href="/login">
              <a tw="inline-block bg-blue-500 p-3 rounded block mt-4">Login</a>
            </Link>
          )}
        <Link href="/secure">
          <a tw="inline-block bg-blue-500 p-3 rounded block mt-4">You must be logged in to view this page.</a>
        </Link>
      </main>
    </div>
  )
}
