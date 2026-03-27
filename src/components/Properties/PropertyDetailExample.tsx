'use client'

import { MatterportViewer } from './MatterportViewer'

/**
 * EJEMPLO: Cómo usar el componente MatterportViewer en una página de propiedad
 * 
 * Este es un ejemplo de cómo integrar una presentación de Matterport en una página de detalles de propiedad.
 */

export const PropertyDetailExample = () => {
  // Ejemplo de datos de una propiedad con Matterport
  const property = {
    id: 1,
    title: 'Luxury Home in Salt Lake City',
    address: '123 Main Street, Salt Lake City, UT 84101',
    price: '$850,000',
    beds: 4,
    baths: 3,
    sqft: 3500,
    matterportUrl: 'https://my.matterport.com/show/?m=DEkqXFgPVBQ', // URL de Matterport
    description: 'Beautiful luxury home with stunning views and modern amenities.',
    features: [
      'Hardwood floors',
      'Granite countertops',
      'Stainless steel appliances',
      'Master suite with spa',
      'Home office',
      'Backyard with pool'
    ]
  }

  return (
    <div className='bg-white dark:bg-dark'>
      <div className='container max-w-6xl mx-auto px-5 2xl:px-0 py-12 md:py-16'>
        
        {/* Property Header */}
        <div className='mb-12'>
          <h1 className='text-4xl font-bold text-dark dark:text-white mb-2'>
            {property.title}
          </h1>
          <p className='text-lg text-gray-600 dark:text-gray-400 mb-4'>
            {property.address}
          </p>
          <p className='text-3xl font-bold text-primary mb-6'>
            {property.price}
          </p>
          
          {/* Property Stats */}
          <div className='grid grid-cols-3 gap-4 mb-8'>
            <div className='bg-gray-50 dark:bg-dark/50 p-4 rounded-lg'>
              <p className='text-sm text-gray-600 dark:text-gray-400'>Bedrooms</p>
              <p className='text-2xl font-bold text-dark dark:text-white'>{property.beds}</p>
            </div>
            <div className='bg-gray-50 dark:bg-dark/50 p-4 rounded-lg'>
              <p className='text-sm text-gray-600 dark:text-gray-400'>Bathrooms</p>
              <p className='text-2xl font-bold text-dark dark:text-white'>{property.baths}</p>
            </div>
            <div className='bg-gray-50 dark:bg-dark/50 p-4 rounded-lg'>
              <p className='text-sm text-gray-600 dark:text-gray-400'>Square Feet</p>
              <p className='text-2xl font-bold text-dark dark:text-white'>{property.sqft.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* 3D Virtual Tour - MATTERPORT */}
        <div className='mb-12 bg-gray-50 dark:bg-dark/50 p-8 rounded-lg'>
          <MatterportViewer 
            matterportUrl={property.matterportUrl}
            title='3D Virtual Tour'
          />
        </div>

        {/* Property Description */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2'>
            <h2 className='text-2xl font-bold text-dark dark:text-white mb-4'>
              About this property
            </h2>
            <p className='text-gray-700 dark:text-gray-300 mb-6 leading-relaxed'>
              {property.description}
            </p>

            <h3 className='text-xl font-bold text-dark dark:text-white mb-4'>
              Features
            </h3>
            <ul className='grid grid-cols-2 gap-3'>
              {property.features.map((feature, index) => (
                <li key={index} className='flex items-center gap-2 text-gray-700 dark:text-gray-300'>
                  <span className='w-2 h-2 bg-primary rounded-full'></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div className='bg-gradient-to-br from-primary/10 to-teal-500/10 dark:from-primary/5 dark:to-teal-500/5 rounded-lg p-6 border border-primary/20 h-fit'>
            <h3 className='text-xl font-bold text-dark dark:text-white mb-4'>
              Interested in this property?
            </h3>
            <p className='text-gray-700 dark:text-gray-300 mb-6'>
              Contact us for more information or to schedule a showing.
            </p>
            <button className='w-full bg-gradient-to-r from-primary to-teal-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-shadow'>
              Schedule a Showing
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
