import { getSiteSectionByKey } from "@/lib/queries/content";
import PropertySearchClient from "./PropertySearchClient";
import IdxSearchBox from "./IdxSearchBox";

const PropertySearch = async () => {
  // Sección `home_property_search`
  const section = await getSiteSectionByKey('home_property_search');

  if (section && section.isVisible === false) return null;

  const badge = section?.title || 'Search Available Homes';
  const title = section?.subtitle || 'Find your next home across Central Missouri.';
  const description = section?.description || 'Live MLS-connected search. Browse properties by city, county, or zip code — or refine by price, beds, and property type.';

  const primaryLabel = section?.primaryCtaLabel || 'Browse Map Search';
  const primaryHref = section?.primaryCtaHref || '/idx-properties';

  const secondaryLabel = section?.secondaryCtaLabel || 'Start Buyer Process';
  const secondaryHref = section?.secondaryCtaHref || '/buyers';

  return (
    <section id="property-search" className="bg-dark">
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-white/75 text-base font-semibold italic mb-4">
            {badge}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{title}</h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Widget de búsqueda con autocompletado IDX Addons */}
        <div className="max-w-4xl mx-auto mb-10 flex justify-center px-4">
          <div className="w-full bg-white dark:bg-dark rounded-2xl p-4 sm:p-6 shadow-lg">
            <IdxSearchBox />
          </div>
        </div>

        <PropertySearchClient
          primaryLabel={primaryLabel}
          primaryHref={primaryHref}
          secondaryLabel={secondaryLabel}
          secondaryHref={secondaryHref}
        />
      </div>
    </section>
  );
};

export default PropertySearch;
