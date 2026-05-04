import { NextRequest, NextResponse } from 'next/server'

/**
 * Debug endpoint to test IDX Broker widget script loading
 */
export async function GET(request: NextRequest) {
  try {
    // Test 1: Check if IDX Broker script is accessible
    console.log('[WIDGET_DEBUG] Testing IDX Broker script accessibility...')
    
    const scriptUrl = 'https://ivanutahrealtor.idxbroker.com/idx/js/idx.js'
    const scriptResponse = await fetch(scriptUrl)
    
    console.log('[WIDGET_DEBUG] Script response status:', scriptResponse.status)
    
    const scriptText = await scriptResponse.text()
    const scriptSize = scriptText.length
    
    console.log('[WIDGET_DEBUG] Script size:', scriptSize)
    console.log('[WIDGET_DEBUG] Script preview:', scriptText.substring(0, 500))

    // Test 2: Check if the domain is accessible
    const domainUrl = 'https://ivanutahrealtor.idxbroker.com'
    const domainResponse = await fetch(domainUrl)
    
    console.log('[WIDGET_DEBUG] Domain response status:', domainResponse.status)

    return NextResponse.json({
      success: true,
      script: {
        url: scriptUrl,
        status: scriptResponse.status,
        size: scriptSize,
        preview: scriptText.substring(0, 500),
        accessible: scriptResponse.ok,
      },
      domain: {
        url: domainUrl,
        status: domainResponse.status,
        accessible: domainResponse.ok,
      },
      message: 'Widget debug test completed',
    })
  } catch (error) {
    console.error('[WIDGET_DEBUG_ERROR]', error)
    return NextResponse.json(
      {
        error: 'Widget debug test failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
