import Link from "next/link";
import React from "react";

export default () => {
  const curTime = new Date();
  const helloString = `Welcome to next.js at ${curTime.toTimeString()}!`;
  return (
    <div>
      <div>{helloString}</div>
      <div><Link href="/page1"><a>Page1</a></Link></div>
      <div><Link href="/page2"><a>Page2</a></Link></div>
    </div>
  );
}