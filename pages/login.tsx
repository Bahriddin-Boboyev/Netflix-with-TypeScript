import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAuth from '../hooks/useAuth'
import { Toaster, toast } from 'react-hot-toast'

interface Inputs {
  email: string
  password: string
}

const Login = () => {
  const [login, setLogin] = React.useState(false)
  const { signIn, signUp } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
    const check = localStorage.getItem('check')
    if (check === 'Firebase: Error (auth/user-not-found).') {
      toast.error(`User not found. If you are new, please register`, {
        duration: 5000,
      })
      localStorage.removeItem('check')
    } else if (check === 'Firebase: Error (auth/email-already-in-use') {
      toast.error(`You are already registered.`, {
        duration: 5000,
      })
      localStorage.removeItem('check')
    } else if (
      check ===
      'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).'
    ) {
      toast(
        `Access to this account has been temporarily disabled due to many failed login attempts.`,
        {
          duration: 5000,
        }
      )
      localStorage.removeItem('check')
    } else if(check?.length){
      toast(`${check}`, {
        duration: 5000,
      })
      localStorage.removeItem('check')
    }
    else {
      toast.success(`Successfully.`, {
        duration: 5000,
      })
      localStorage.removeItem('check')
    }
  }

  return (
    <div className="flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster position="bottom-center" gutter={24} />
      <Image
        src="https://assets.nflxext.com/ffe/siteui/vlv3/d0982892-13ac-4702-b9fa-87a410c1f2da/519e3d3a-1c8c-4fdb-8f8a-7eabdbe87056/AE-en-20220321-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
        alt="img"
      />
      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              autoComplete="off"
              type="email"
              placeholder="Email"
              className="input"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              autoComplete="off"
              type="password"
              placeholder="Password"
              className="input"
              {...register('password', { required: true })}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>
        <button
          type="submit"
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>
        <div>
          <p className="text-[gray] inline-block font-semibold pr-2">
            New to Netflix?
          </p>{' '}
          <button
            type="submit"
            className="text-white hover:underline"
            onClick={() => setLogin(false)}
          >
            Sign Up now
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
