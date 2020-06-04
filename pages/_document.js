import Document, { Html, Head, Main, NextScript } from 'next/document'

class AppDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en" className="h-full">
        <Head />
        <body className="bg-white h-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default AppDocument
