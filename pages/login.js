import Head from 'next/head'
import tw from 'twin.macro'
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import { useAuth } from "../services/useAuth.js";

export default function Home() {
  const router = useRouter();
  const { login } = useAuth();
  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      const loginAttempt = await login(email, password);
      if (loginAttempt.status === 204) {
        router.push('/');
      } else {
        alert('Login failed');
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <form onSubmit={handleSubmit(onSubmit)} tw="mx-auto max-w-sm">
        <input name="email" ref={register} tw="border p-4 w-full mt-4" defaultValue="test@test.com" />
        <input name="password" ref={register} tw="border p-4 w-full mt-4" defaultValue="password" />

        <input type="submit" tw="inline-block bg-blue-500 p-3 rounded block mt-4 w-full" />
      </form>
    </>
  );
}

export async function getServerSideProps({ res, req }) {
  // Is there a better way to know the user is already logged in?
  try {
    const isAuthed = await fetch(`http://localhost:8000/api/user`, {
      credentials: "include",
      headers: {
        accept: 'application/json',
        referer: 'http://localhost:3000/',
        cookie: req.headers.cookie,
      }
    });
    if (isAuthed.status === 200) {
      res.setHeader('Location', "/");
      res.statusCode = 302;

      return { props: { } };
    }
  } catch (error) {
    console.error(error);
  } 

  const csrf = await fetch(`http://localhost:8000/sanctum/csrf-cookie`)
  res.setHeader('set-cookie', csrf.headers.raw()['set-cookie']);

  return { props: { } };
}
