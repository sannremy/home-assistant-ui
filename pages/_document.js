import Document, { Html, Head, Main, NextScript } from 'next/document'

class AppDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang={process.env.locale.substring(0, 2)} className="overflow-hidden h-full">
        <Head />
        <body className="bg-indigo-100 border-indigo-300 overflow-auto h-full" style={{
          borderTopWidth: process.env.isProd ? '20px' : 0,
        }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default AppDocument
