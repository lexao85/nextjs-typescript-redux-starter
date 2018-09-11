import Document, { Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  public render() {
    return (
      <html lang="en">
        <body role="main">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
