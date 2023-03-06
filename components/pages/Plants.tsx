import Head from 'next/head'
import React from 'react'

export const Plants = () => {
  return (
    <div>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <img
          src="https://rb.gy/ulxxee"
          alt="Netflix"
          width={150}
          height={90}
          className="cursor-pointer object-contain"
        />
      </header>
    </div>
  )
}
