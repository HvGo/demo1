import PropertiesFilteredClient from './PropertiesFilteredClient'
import PropertyContactFlow from './PropertyContactFlow'

export default function PropertiesFilteredListing() {
  return (
    <section className="pt-0! w-full">
      {/* IDX Broker Widget - Live MLS Listings */}
      <PropertiesFilteredClient />
      
      {/* Property Contact Flow - Modal and success messages */}
      <PropertyContactFlow />
    </section>
  )
}
