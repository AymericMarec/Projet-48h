'use client'

import SearchStation from "@/component/searchStation"
import FindMyPath from "@/component/findmyPath";

export default function Home() {


  return (
    <div>
      {/* <Map></Map> */}
      <SearchStation />
      <FindMyPath />
    </div>
  );
}
