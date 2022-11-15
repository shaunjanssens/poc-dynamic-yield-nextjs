import {NextResponse} from "next/server";

import {getDynamicYieldCampaign} from "./lib/dynamicYield";

export const USER_COOKIE = '_dyid_server'
export const SESSION_COOKIE = '_dyjsession'

export const CAMPAIGNS = {
    '/static-campaign': {
        selector: 'POC Campaign',
    }
}

export const middleware = async (req) => {
    const {pathname} = req.nextUrl
    const route = CAMPAIGNS[pathname]

    if (!route) return;

    const userId = req.cookies.get(USER_COOKIE)?.value
    const sessionId = req.cookies.get(SESSION_COOKIE)?.value

    const campaign = await getDynamicYieldCampaign({campaignName: route.selector, userId, sessionId, pathname})

    const url = req.nextUrl.clone()
    url.pathname = `${pathname}/${campaign.variant ? campaign.variant.data.variant : 'CONTROL'}`

    const res = NextResponse.rewrite(url)

    if (campaign.cookies) {
        campaign.cookies.map(({name, value}) => {
            if (name === USER_COOKIE || name === SESSION_COOKIE) {
                res.cookies.set(name, value)
            }


        })
    }

    return res
}