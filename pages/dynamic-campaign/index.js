import {getDynamicYieldCampaign} from "../../lib/dynamicYield";
import {SESSION_COOKIE, USER_COOKIE} from "../../lib/constants";

export const CAMPAIGNS = {
    '/dynamic-campaign': {
        selector: 'POC Campaign',
    }
}

const Page = ({variant}) => {
    return <h1>You&apos;re in bucket: {variant?.data?.variant}</h1>
}

export const getServerSideProps = async (context) => {
    const pathname = context.resolvedUrl
    const route = CAMPAIGNS[pathname]

    const userId = context.req.cookies[USER_COOKIE]
    const sessionId = context.req.cookies[SESSION_COOKIE]

    const campaign = await getDynamicYieldCampaign({campaignName: route.selector, userId, sessionId, pathname})

    if (campaign.cookies) {
        const cookies = campaign.cookies.map(({name, value}) => {
            if (name === USER_COOKIE || name === SESSION_COOKIE) {
                return `${name}=${value}`
            }
        })
        if (cookies) context.res.setHeader('set-cookie', cookies)
    }

    return {
        props: {variant: campaign.variant}
    }
}

export default Page