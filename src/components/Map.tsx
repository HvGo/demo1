'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface MapProps {
  address: string;
}

export default function Map({ address }: MapProps) {
  const [embedUrl, setEmbedUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const geocodeAndGenerateMap = async () => {
      try {
        // Coordenadas por defecto para West Jordan, UT (tu ejemplo)
        let latNum = 40.586;
        let lonNum = -111.941;

        console.log('Geocoding address:', address);

        // Extraer ciudad y estado del address (formato: "Street Address, City, State ZIP")
        const addressParts = address.split(',').map(part => part.trim());
        let streetAddress = address;
        let city = '';
        let state = '';

        if (addressParts.length >= 2) {
          streetAddress = addressParts[0];
          city = addressParts[1];
          
          if (addressParts.length >= 3) {
            // Extraer estado y ZIP del último segmento (ej: "UT 84088")
            const stateZip = addressParts[2];
            const stateMatch = stateZip.match(/^([A-Z]{2})/);
            if (stateMatch) {
              state = stateMatch[1];
            }
          }
        }

        console.log('Parsed address:', { streetAddress, city, state });

        // Intentar geocoding desde el backend con parámetros separados
        try {
          const params = new URLSearchParams({
            address: streetAddress,
            city: city,
            state: state,
            country: 'United States'
          });

          const response = await fetch(`/api/geocode?${params.toString()}`);
          const data = await response.json();
          
          console.log('Geocoding response:', data);

          if (data.success && data.latitude && data.longitude) {
            latNum = parseFloat(data.latitude);
            lonNum = parseFloat(data.longitude);
            console.log('Geocoding successful:', latNum, lonNum);
          } else {
            console.log('No results from geocoding, using default coords');
          }
        } catch (geocodeError) {
          console.error('Geocoding failed:', geocodeError);
          console.log('Using default coords');
        }

        console.log('Final coordinates:', latNum, lonNum);

        // Crear URL de OSM embed
        const url = `https://www.openstreetmap.org/export/embed.html?bbox=${lonNum-0.015},${latNum-0.015},${lonNum+0.015},${latNum+0.015}&layer=mapnik&marker=${latNum},${lonNum}`;
        console.log('Embed URL:', url);
        setEmbedUrl(url);
      } catch (error) {
        console.error('Error:', error);
        // Fallback a coordenadas seguras
        setEmbedUrl(`https://www.openstreetmap.org/export/embed.html?bbox=-77.05,-12.05,-77.03,-12.03&layer=mapnik&marker=-12.046,-77.0428`);
      } finally {
        setIsLoading(false);
      }
    };

    if (address) {
      geocodeAndGenerateMap();
    } else {
      setIsLoading(false);
    }
  }, [address]);

  const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(address || 'Ubicación')}`;

  return (
    <div className="rounded-2xl w-full overflow-hidden">
      {isLoading ? (
        <div className="w-full h-96 bg-gradient-to-b from-blue-50 to-blue-100 animate-pulse rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando mapa...</p>
          </div>
        </div>
      ) : embedUrl ? (
        <iframe
          src={embedUrl}
          width="100%"
          height="400"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-2xl w-full h-96"
          title={`Mapa de ${address}`}
          allowFullScreen
        />
      ) : (
        <Link
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative w-full h-96 bg-gradient-to-b from-blue-50 to-blue-100 hover:opacity-90 transition-opacity rounded-2xl"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <svg className="w-16 h-16 text-blue-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z" />
            </svg>
            <p className="text-gray-700 font-medium mb-2">Ubicación</p>
            <p className="text-sm text-gray-600 text-center px-6 mb-4 max-w-xs">
              {address || 'Dirección no disponible'}
            </p>
            <span className="bg-blue-600 text-white py-2 px-6 rounded-full text-sm font-medium hover:bg-blue-700">
              Ver en Google Maps
            </span>
          </div>
        </Link>
      )}
    </div>
  );
}
