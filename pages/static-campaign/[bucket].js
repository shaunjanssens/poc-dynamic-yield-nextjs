const Page = ({bucket}) => {
    return <h1>You're in bucket: {bucket}</h1>
}

export const getStaticProps = async ({params}) => {
    return {
        props: {bucket: params.bucket}
    }
}

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking"
    }
}

export default Page