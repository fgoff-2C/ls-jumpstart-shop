export default async function test(environment) {
    let contentType;
    try {
        contentType = await environment.getContentType('product');
        console.log('Content type "product" already exists. Updating...');
    } catch (err) {
        if (err.name === 'NotFound') {
            console.log('Content type "product" does not exist. Creating...');
            contentType = await environment.createContentTypeWithId('product', {
                name: 'Product',
                description: 'For adding products',
                fields: [],
            });
        } else {
            throw err;
        }
    }

    // Define fields
    const fields = [
        { id: 'internalName', name: 'Internal Name', type: 'Symbol' },
        { id: 'title', name: 'Title', type: 'Symbol', required: true },
        { id: 'slug', name: 'Slug', type: 'Symbol', required: true },
        { id: 'size', name: 'Size', type: 'Symbol', required: true },
        {
            id: 'categories',
            name: 'Categories',
            type: 'Array',
            items: {
                type: 'Link',
                linkType: 'Entry',
                validations: [{ linkContentType: ['category'] }],
            },
        },
        {
            id: 'description',
            name: 'Description',
            type: 'RichText',
            validations: [
                {
                    enabledNodeTypes: [
                        'heading-1',
                        'heading-2',
                        'heading-3',
                        'heading-4',
                        'heading-5',
                        'heading-6',
                        'ordered-list',
                        'unordered-list',
                        'hr',
                        'blockquote',
                        'embedded-entry-block',
                        'embedded-asset-block',
                        'hyperlink',
                        'entry-hyperlink',
                        'asset-hyperlink',
                        'embedded-entry-inline',
                    ],
                },
                { enabledMarks: ['bold', 'italic', 'underline', 'code'] },
            ],
        },
        { id: 'price', name: 'Price', type: 'Number', required: true },
        { id: 'image', name: 'Image', type: 'Link', linkType: 'Asset', required: true },
    ];

    // Add or update fields
    contentType.displayField = 'internalName';
    contentType.fields = fields;
    const updatedContentType = await contentType.update();
    console.log('Content type "product" updated successfully.');

    // Publish the content type
    await updatedContentType.publish();
    console.log('Content type "product" published successfully.');
}