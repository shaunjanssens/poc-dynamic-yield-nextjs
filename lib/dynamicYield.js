export const getDynamicYieldCampaign = async ({campaignName, userId, sessionId, userConsent = true, pathname}) => {
    const headers = new Headers();
    headers.append("DY-API-Key", "4e658a12777b7ab571c4e06ab83afac4d4b48a8b26702067491a5f3fd044fe7b");
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
            "names": [
                campaignName
            ]
        },
        "context": {
            "page": {
                "type": "OTHER",
                "data": [],
                "location": `${process.env.DOMAIN || process.env.NEXT_PUBLIC_VERCEL_URL}${pathname}`
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

    const campaign = data.choices.find(choice => choice.name === campaignName)
    const variant =  campaign ? campaign.variations[0] : null

    return {
        name: campaign.name,
        variant: {
            id: variant.id,
            data: variant.payload.data
        },
        cookies: data.cookies
    }
}