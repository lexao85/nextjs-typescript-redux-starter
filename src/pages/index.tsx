import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

export default () => {
  const curTime = new Date();
  const helloString = `Welcome to next.js at ${curTime.toTimeString()}!`;
  return (
    <div>
      <Head key="title">
        <title>Main</title>
      </Head>
      <div>{helloString}</div>
      <div><Link href="/page1" as="/page1"><a>Page1</a></Link></div>
      <div><Link href="/page2" as="/page2"><a>Page2</a></Link></div>
    </div>
  );
};
