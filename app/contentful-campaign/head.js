import {getPosts} from "../../lib/contentfull";

const Head = async () => {
    const posts = await getPosts()
    const metaDescription = posts.items.map(post => post.fields.title).join(', ')

    return (
        <>
            <title>Personalised Contentful Block</title>
            <meta name="description" content={metaDescription}/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </>
    )
}

export default Head