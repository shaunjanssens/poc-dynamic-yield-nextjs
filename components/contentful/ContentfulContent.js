import {Fragment} from "react";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import {BLOCKS} from "@contentful/rich-text-types";

const ContentfulContent = ({content, campaigns}) => {
    const options = {
        renderNode: {
            [BLOCKS.EMBEDDED_ENTRY]: (node) => {
                const {sys, fields} = node.data.target

                switch (sys.contentType.sys.id) {
                    case 'personalisedBlock':
                        // Find campaign used in personalised block
                        const campaign = campaigns.find(({name}) => name === fields.campaignName)
                        return (
                            <div key={sys.id}>
                                <h3>{fields.title}</h3>
                                <p>Campaign name: <strong>{fields.campaignName}</strong></p>
                                {fields.blocks.map(block => {
                                        // Check if block is active variant
                                        if (block.sys.id === campaign?.variant.data.entryId) {
                                            return (
                                                <Fragment key={block.sys.id}>
                                                    <h4>{block.fields.title}</h4>
                                                    <ContentfulContent content={block.fields.content}/>
                                                </Fragment>
                                            )
                                        }
                                    }
                                )}
                            </div>
                        )
                }

                return <p>Unknown block: {sys.contentType.sys.id}</p>
            }
        }
    };

    return documentToReactComponents(content, options)
}

export default ContentfulContent