"use client";

import Image from "next/image";
import Getproduct from "./productInfo";
import Search from "./search";
export default function Home() {
  return (
    <>
      <header>
        <h1>
          Endirim<span>Axtar</span>
        </h1>
        <Image src="userIco.svg" alt="UserIcon" width={25} height={25} />
        <Image
          src="notificationIco.svg"
          alt="NotificationIco"
          width={25}
          height={25}
        />
      </header>
      <main className="">
        <Search onSearch={(value) => console.log("Arama değeri:", value)} />

        <Getproduct />
      </main>
    </>
  );
}
