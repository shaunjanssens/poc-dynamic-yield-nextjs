import {NextResponse} from "next/server";

import {SESSION_COOKIE, USER_COOKIE} from "./lib/constants";
import {getDynamicYieldCampaigns, getDynamicYieldCookies} from "./lib/dynamicYield";

// Predefined pages with campaign used
export const CAMPAIGNS = {
    '/static-campaign': {
        campaignName: 'POC Campaign',
    }
}

export const middleware = async (req) => {
    const {pathname} = req.nextUrl

    // Get predefined route with campaign name
    const route = CAMPAIGNS[pathname]

    // Get cookies used for Dynamic Yield
    const userId = req.cookies.get(USER_COOKIE)?.value
    const sessionId = req.cookies.get(SESSION_COOKIE)?.value

    if (route) {
        // Fetch campaign defined by route
        const {campaigns, cookies} = await getDynamicYieldCampaigns({
            campaignNames: [route.campaignName],
            userId,
            sessionId,
            pathname
        })

        // Select campaign
        const campaign = campaigns.find(({name}) => name === route.campaignName)

        // Create redirect to static generated page based on campaign variant
        const url = req.nextUrl.clone()
        url.pathname = `${pathname}/${campaign.variant ? campaign.variant.data.variant : 'CONTROL'}`

        const res = NextResponse.rewrite(url)

        // Set cookies returned by Dynamic Yield
        if (cookies) {
            cookies.map(({name, value}) => {
                if (name === USER_COOKIE || name === SESSION_COOKIE) {
                    res.cookies.set(name, value)
                }
            })
        }

        return res
    }

    if (!userId || !sessionId) {
        // Get cookies from Dynamic Yield
        const cookies = await getDynamicYieldCookies()

        const res = NextResponse.next()

        // Set cookies returned by Dynamic Yield
        if (cookies) {
            cookies.map(({name, value}) => {
                if (name === USER_COOKIE || name === SESSION_COOKIE) {
                    res.cookies.set(name, value)
                }
            })
        }

        return res
    }

}