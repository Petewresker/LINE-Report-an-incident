"use client"

import { useEffect } from "react";
import liff from "@line/liff";

export default function Home() {

  const main = async () => {

    await liff.init({
      liffId: process.env.NEXT_PUBLIC_LIFF_ID!
    });

    if (!liff.isLoggedIn()) {
      liff.login();
    }

  };

  useEffect(() => {
    main();
  }, []);

  return (
    <div id="line profile">
      <img width="100" src="https://fastly.picsum.photos/id/853/100/100.jpg" alt="" />
      <div>Hello Name</div>
      <div>UserID :</div>
    </div>
  );
}
