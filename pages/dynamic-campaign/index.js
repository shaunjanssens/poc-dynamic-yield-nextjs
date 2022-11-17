import {getDynamicYieldCampaigns} from "../../lib/dynamicYield";
import {SESSION_COOKIE, USER_COOKIE} from "../../lib/constants";

const campaignName = 'POC Campaign'

const Page = ({variant}) => {
    return <h1>You&apos;re in bucket: {variant?.data?.variant}</h1>
}

export const getServerSideProps = async (context) => {
    const pathname = context.resolvedUrl

    // Get cookies used for Dynamic Yield
    const userId = context.req.cookies[USER_COOKIE]
    const sessionId = context.req.cookies[SESSION_COOKIE]

    // Fetch campaign defined by route
    const {campaigns, cookies} = await getDynamicYieldCampaigns({
        campaignNames: [campaignName],
        userId,
        sessionId,
        pathname
    })

    // Select campaign
    const campaign = campaigns.find(({name}) => name === campaignName)

    // Set cookies returned by Dynamic Yield
    if (cookies) {
        context.res.setHeader('set-cookie', cookies.map(({name, value}) => {
            if (name === USER_COOKIE || name === SESSION_COOKIE) {
                return `${name}=${value}`
            }
        }))
    }

    return {
        props: {variant: campaign.variant}
    }
}

export default Page