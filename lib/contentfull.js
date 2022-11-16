const contentful = require('contentful')

const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    environment: process.env.CONTENTFUL_ENVIRONMENT,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export const getPosts = () => {
    return client.getEntries({
        content_type: 'post',
        include: 3
    })
}