import React from "react"
import useLatestData from "../utils/useLatestData"
import LoadingGrid from "../components/LoadingGrid"
import { HomePageGrid } from "../styles/Grid"
import ItemGrid from "../components/ItemGrid"

function CurrentlySlicing({ slicemasters }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Slicemasters On</span>
      </h2>
      {!slicemasters && <LoadingGrid count={4} />}
      {slicemasters && !slicemasters?.length && <p>Fuck of</p>}
      {slicemasters?.length && <ItemGrid items={slicemasters} />}
    </div>
  )
}
function HotSlices({ hotSlices }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Slices On</span>
      </h2>
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices?.length && <p>Nothing here</p>}
      {hotSlices?.length && <ItemGrid items={hotSlices} />}
    </div>
  )
}

function HomePage() {
  const { slicemasters, hotSlices } = useLatestData()
  return (
    <div className="center">
      <h1>The best pizza in Downisbownis</h1>
      <p>Open whole time :)</p>
      <HomePageGrid>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </HomePageGrid>
    </div>
  )
}

export default HomePage
