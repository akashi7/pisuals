import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <link
        href='https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap'
        rel='preconnect'
      ></link>
      <body className='antialiased'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
