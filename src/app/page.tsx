'use client'

import Map from "@/component/Map";
import dynamic from 'next/dynamic'

export default function Home() {

  const Map = dynamic(() => import('@/component/Map'), {
    ssr: false,
  })
  return (
    <div>
    </div>
  );
}
