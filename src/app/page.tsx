'use client'

import SearchStation from "@/component/searchStation"
import FindMyPath from "@/component/findmyPath";
import StatusStations from "@/component/statusStations";

export default function Home() {


  return (
    <div>
      {/* <Map></Map> */}
      {/*<SearchStation />*/}
      <FindMyPath />
      <StatusStations/>
    </div>
  );
}
