
'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';

interface MapProps {
  address: string;
}

export default function Map({ address }: MapProps) {
  // Coordenadas fijas para West Jordan, UT
  const latitude = 40.586843;
  const longitude = -111.926818;

  // URLs para diferentes opciones de navegación
  const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(address || 'Ubicación')}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  const appleMapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(address || 'Ubicación')}&ll=${latitude},${longitude}`;

  return (
    <div className="rounded-2xl w-full overflow-hidden">
      <div className="relative">
        <iframe
          src={`https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
          width="100%"
          height="400"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-2xl w-full h-96"
          title={`Mapa de ${address}`}
          allowFullScreen
        />
        <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
          <Link
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-lg shadow-lg transition-colors"
          >
            <Icon icon="ph:navigation-bold" width={18} height={18} />
            <span className="text-sm font-medium">Direcciones</span>
          </Link>
          <Link
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-lg shadow-lg transition-colors"
          >
            <Icon icon="ph:map-pin-bold" width={18} height={18} />
            <span className="text-sm font-medium">Google Maps</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
