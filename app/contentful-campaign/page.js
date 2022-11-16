import {cookies, headers} from 'next/headers';

import styles from '../../styles/Posts.module.css'

import {getPosts} from "../../lib/contentfull";
import {getDynamicYieldCampaigns} from "../../lib/dynamicYield";
import {SESSION_COOKIE, USER_COOKIE} from "../../lib/constants";
import {findValuesInObject, getUniqueValuesInArray} from "../../lib/helpers";
import ContentfulContent from "../../components/contentful/ContentfulContent";

const getCampaignNames = (posts) => {
    return getUniqueValuesInArray(findValuesInObject(posts, 'campaignName'))
}

const Page = async () => {
    const cookieList = cookies()
    const headersList = headers();

    // Fetch all posts from Contentful
    const posts = await getPosts()

    // Get cookies used for Dynamic Yield
    const userId = cookieList.get(USER_COOKIE)?.value
    const sessionId = cookieList.get(SESSION_COOKIE)?.value

    // Get page url
    const url = headersList.get('referer');

    // Get all campaign names used in posts
    const campaignNames = getCampaignNames(posts)

    // Fetch all campaigns used in posts
    const {campaigns} = await getDynamicYieldCampaigns({
        campaignNames,
        userId,
        sessionId,
        url
    })

    return (
        <>
            <h1>Posts</h1>
            {campaigns.map(campaign => <p
                    key={campaign.name}>{campaign.name}: <code>{JSON.stringify(campaign.variant.data)}</code>
                </p>
            )}
            <div className={styles.list}>
                {posts.items.map(post => (
                    <div key={post.sys.id} className={styles.item}>
                        <h2>{post.fields.title}</h2>
                        <div className={styles.content}>
                            <ContentfulContent content={post.fields.content} campaigns={campaigns}/>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Page