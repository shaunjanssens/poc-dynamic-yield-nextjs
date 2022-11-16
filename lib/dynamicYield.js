export const getDynamicYieldCampaigns = async ({
                                                   campaignNames,
                                                   userId,
                                                   sessionId,
                                                   userConsent = true,
                                                   pathname,
                                                   url
                                               }) => {
    const headers = new Headers();
    headers.append("DY-API-Key", process.env.DYNAMIC_YIELD_API_KEY);
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify({
        "user": {
            "dyid": userId,
            "dyid_server": userId,
            "active_consent_accepted": userConsent
        },
        "session": {
            "dy": sessionId
        },
        "selector": {
            "names": campaignNames
        },
        "context": {
            "page": {
                "type": "OTHER",
                "data": [],
                "location": url || `${process.env.DOMAIN || process.env.NEXT_PUBLIC_VERCEL_URL}${pathname}`
            },
            "device": {}
        }
    })

    const data = await fetch("https://dy-api.eu/v2/serve/user/choose", {
        method: 'POST',
        headers,
        body,
    })
        .then(response => response.json())

    const campaigns = data?.choices.map(campaign => ({
        name: campaign?.name || '',
        variant: {
            id: campaign?.variations?.[0]?.id || null,
            data: campaign?.variations?.[0]?.payload?.data || {}
        }
    }))

    return {
        campaigns,
        cookies: data?.cookies
    }
}

export const getDynamicYieldCookies = async () => {
    const headers = new Headers();
    headers.append("DY-API-Key", process.env.DYNAMIC_YIELD_API_KEY);
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify({
        "user": {
            "active_consent_accepted": true
        },
        "context": {
            "page": {
                "type": "OTHER",
                "data": [],
                "location": process.env.DOMAIN || process.env.NEXT_PUBLIC_VERCEL_URL
            },
            "device": {}
        }
    })

    const data = await fetch("https://dy-api.eu/v2/serve/user/choose", {
        method: 'POST',
        headers,
        body,
    })
        .then(response => response.json())


    return data?.cookies
}