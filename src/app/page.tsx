'use client'

import Map from "@/component/Map";
import dynamic from 'next/dynamic'
import SearchStation from "@/component/searchStation"
import FindMyPath from "@/component/findmyPath";

export default function Home() {

  const Map = dynamic(() => import('@/component/Map'), {
    ssr: false,
  })
  return (
    <div>
      {/* <Map></Map> */}
      <SearchStation />
      <FindMyPath />
    </div>
  );
}
