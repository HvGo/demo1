export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');
  const city = searchParams.get('city');
  const state = searchParams.get('state');
  const country = searchParams.get('country') || 'United States';

  if (!address) {
    return Response.json(
      { success: false, error: 'Address parameter is required' },
      { status: 400 }
    );
  }

  try {
    console.log('[Geocode API] Searching for address:', { address, city, state, country });

    // Construir query con formato: ADDRESS + CIUDAD, ESTADO, PAÍS
    let query = address;
    if (city || state) {
      const locationParts: string[] = [];
      if (city) locationParts.push(city);
      if (state) locationParts.push(state);
      if (country) locationParts.push(country);
      query = `${address} ${locationParts.join(', ')}`;
    }

    console.log('[Geocode API] Full query:', query);

    // Intentar búsqueda con query completa
    let results = await searchNominatim(query);

    // Si no hay resultados, intentar con solo ciudad y estado
    if (!results || results.length === 0) {
      console.log('[Geocode API] Full query search failed, trying city/state only');
      if (city && state) {
        const cityStateQuery = `${city}, ${state}, ${country}`;
        console.log('[Geocode API] Trying:', cityStateQuery);
        results = await searchNominatim(cityStateQuery);
      }
    }

    if (results && results.length > 0) {
      const result = results[0];
      if (result.lat && result.lon) {
        console.log('[Geocode API] Success:', result.lat, result.lon);
        return Response.json({
          success: true,
          latitude: result.lat,
          longitude: result.lon,
          display_name: result.display_name
        });
      }
    }

    console.log('[Geocode API] No valid results found');
    return Response.json({
      success: false,
      error: 'No results found for address',
      address: address,
      query: query
    });
  } catch (error) {
    console.error('[Geocode API] Error:', error);
    return Response.json(
      { success: false, error: 'Geocoding failed', details: String(error) },
      { status: 500 }
    );
  }
}

async function searchNominatim(query: string) {
  try {
    const nominatimUrl = new URL('https://nominatim.openstreetmap.org/search');
    nominatimUrl.searchParams.set('q', query);
    nominatimUrl.searchParams.set('format', 'json');
    nominatimUrl.searchParams.set('limit', '1');
    nominatimUrl.searchParams.set('addressdetails', '1');
    nominatimUrl.searchParams.set('accept-language', 'en');

    const fullUrl = nominatimUrl.toString();
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('[Geocode API] NOMINATIM REQUEST');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('Query:', query);
    console.log('Full URL:', fullUrl);
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');

    const response = await fetch(fullUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Homely/1.0)',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Nominatim API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('[Geocode API] Nominatim response:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('[Geocode API] Nominatim search error:', error);
    return null;
  }
}
