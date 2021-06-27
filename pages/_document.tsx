// page/_documnet.js
import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {

  /**
   * @description 최초 데이터 fetch 시 사용해도 괜찮을 듯?
   * @returns 
   */
  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx);
  //   return { ...initialProps };
  // }

  render() {
    return (
      <html>
        <Head>
          {/* <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          /> */}
          {/* 여기에 폰트 임포팅, 여기에 공통 CSS e.g.reset-css/common.css */}
        </Head>
        <body>
          <div id="root">
            <Main />
            <NextScript />
          </div>
        </body>
      </html>
    );
  }
}
