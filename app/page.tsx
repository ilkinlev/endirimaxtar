"use client";
import Link from "next/link";
import Image from "next/image";
import Search from "./components/Search";
import ProductList from "./components/ProductList";
export default function Home() {
  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <div className="text-6xl font-bold text-red-500">
          Endirim<span className="text-white">Axtar</span>
        </div>

        <div className="flex-1 flex justify-center"></div>

        <div className="flex items-center space-x-4">
          <button type="submit" className="cursor-pointer">
            <Link href="/userlogin" rel="noopener noreferrer">
              <Image src="userIco.svg" alt="UserIcon" width={25} height={25} />
            </Link>
          </button>
          <button type="submit" className="cursor-pointer">
            <Image
              src="notificationIco.svg"
              alt="NotificationIco"
              width={25}
              height={25}
            />
          </button>
        </div>
      </header>

      <main className="">
        <div className="flex items-center justify-center py-5">
          <Search onSearch={(value) => console.log("Arama değeri:", value)} />
        </div>
        <div>
          <ProductList />
        </div>
      </main>
    </>
  );
}
