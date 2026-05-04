import { NextRequest, NextResponse } from 'next/server'

/**
 * Exhaustive search test to find the correct API endpoint for properties
 */
export async function GET(request: NextRequest) {
  try {
    const accessKey = process.env.IDX_BROKER_ACCESS_KEY

    if (!accessKey) {
      return NextResponse.json({ error: 'Missing accessKey' }, { status: 400 })
    }

    const results: any = {}

    // Test 1: /mls/search/c072 with cityID
    console.log('[SEARCH_EXHAUSTIVE] Test 1: search with cityID')
    const url1 = `https://api.idxbroker.com/mls/search/c072?cityID=41140`
    const response1 = await fetch(url1, {
      headers: { 'accesskey': accessKey },
    })
    const text1 = await response1.text()
    results.test1_with_cityid = {
      status: response1.status,
      body: text1.substring(0, 500),
    }

    // Test 2: /mls/search/c072 with mlsPtID (property type)
    console.log('[SEARCH_EXHAUSTIVE] Test 2: search with mlsPtID')
    const url2 = `https://api.idxbroker.com/mls/search/c072?mlsPtID=1`
    const response2 = await fetch(url2, {
      headers: { 'accesskey': accessKey },
    })
    const text2 = await response2.text()
    results.test2_with_mlsptid = {
      status: response2.status,
      body: text2.substring(0, 500),
    }

    // Test 3: /mls/search/c072 with status
    console.log('[SEARCH_EXHAUSTIVE] Test 3: search with status')
    const url3 = `https://api.idxbroker.com/mls/search/c072?status=Active`
    const response3 = await fetch(url3, {
      headers: { 'accesskey': accessKey },
    })
    const text3 = await response3.text()
    results.test3_with_status = {
      status: response3.status,
      body: text3.substring(0, 500),
    }

    // Test 4: /mls/search/c072 with limit and offset
    console.log('[SEARCH_EXHAUSTIVE] Test 4: search with limit and offset')
    const url4 = `https://api.idxbroker.com/mls/search/c072?limit=10&offset=0`
    const response4 = await fetch(url4, {
      headers: { 'accesskey': accessKey },
    })
    const text4 = await response4.text()
    results.test4_with_limit_offset = {
      status: response4.status,
      body: text4.substring(0, 500),
    }

    // Test 5: /mls/search/c072 with all common parameters
    console.log('[SEARCH_EXHAUSTIVE] Test 5: search with all parameters')
    const url5 = `https://api.idxbroker.com/mls/search/c072?cityID=41140&mlsPtID=1&status=Active&limit=5`
    const response5 = await fetch(url5, {
      headers: { 'accesskey': accessKey },
    })
    const text5 = await response5.text()
    results.test5_all_params = {
      status: response5.status,
      body: text5.substring(0, 500),
    }

    // Test 6: Try /listings instead of /search
    console.log('[SEARCH_EXHAUSTIVE] Test 6: /mls/listings')
    const url6 = `https://api.idxbroker.com/mls/listings/c072`
    const response6 = await fetch(url6, {
      headers: { 'accesskey': accessKey },
    })
    const text6 = await response6.text()
    results.test6_listings = {
      status: response6.status,
      body: text6.substring(0, 500),
    }

    // Test 7: Try /properties instead of /search
    console.log('[SEARCH_EXHAUSTIVE] Test 7: /mls/properties')
    const url7 = `https://api.idxbroker.com/mls/properties/c072`
    const response7 = await fetch(url7, {
      headers: { 'accesskey': accessKey },
    })
    const text7 = await response7.text()
    results.test7_properties = {
      status: response7.status,
      body: text7.substring(0, 500),
    }

    // Test 8: Try /idx/search (different component)
    console.log('[SEARCH_EXHAUSTIVE] Test 8: /idx/search')
    const url8 = `https://api.idxbroker.com/idx/search/c072`
    const response8 = await fetch(url8, {
      headers: { 'accesskey': accessKey },
    })
    const text8 = await response8.text()
    results.test8_idx_search = {
      status: response8.status,
      body: text8.substring(0, 500),
    }

    // Test 9: Try /clients/search
    console.log('[SEARCH_EXHAUSTIVE] Test 9: /clients/search')
    const url9 = `https://api.idxbroker.com/clients/search/c072`
    const response9 = await fetch(url9, {
      headers: { 'accesskey': accessKey },
    })
    const text9 = await response9.text()
    results.test9_clients_search = {
      status: response9.status,
      body: text9.substring(0, 500),
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error('[SEARCH_EXHAUSTIVE_ERROR]', error)
    return NextResponse.json(
      {
        error: 'Exhaustive search test failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
