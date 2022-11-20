import Head from "next/head";
import Image from "next/image";

import styles from '../../styles/Products.module.css';
import {getDynamicYieldProducts} from "../../lib/dynamicYield";
import {SESSION_COOKIE, USER_COOKIE} from "../../lib/constants";

const campaignName = 'PLP'
const campaignFilters = {category: ['bra'], rootCategory: ['lingerie']}

const contentfulImageLoader = ({src, width}) => {
    return `${src}?w=${width}&q=60&fm=avif`
}

const Page = ({products, getProductsTime}) => {
    return (
        <>
            <Head>
                <title>Products</title>
                <meta name="description" content="Products page"/>
            </Head>
            <div className={styles.container}>
                <h1>Products</h1>
                <p>Fetching the products took {getProductsTime / 1000} seconds</p>
                <ul className={styles.list}>
                    {products && products.map((product, i) => {
                        return (
                            <li key={product.id}>
                                <div>
                                    <Image src={product.image} alt={product.name}
                                           width={200}
                                           height={200}
                                           loader={contentfulImageLoader}
                                           priority={i <= 12}
                                    />
                                </div>
                                <strong>{product.name}</strong>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export const getServerSideProps = async (context) => {
    const pathname = context.resolvedUrl

    // Get cookies used for Dynamic Yield
    const userId = context.req.cookies[USER_COOKIE]
    const sessionId = context.req.cookies[SESSION_COOKIE]

    // Fetch campaign defined by route
    const {products, getProductsTime} = await getDynamicYieldProducts({
        campaignName,
        campaignFilters,
        userId,
        sessionId,
        pathname
    })

    return {
        props: {products, getProductsTime}
    }
}

export default Page