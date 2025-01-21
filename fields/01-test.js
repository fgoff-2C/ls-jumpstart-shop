export const test = (migration) => {
    const product = migration
        .createContentType("product")
        .name("Product")
        .description("for adding products")
        .displayField("internalName");

    product.createField("internalName").name("Internal Name").type("Symbol");

    product.createField("title").name("Title").type("Symbol").required(true);
    product.createField("slug").name("Slug").type("Symbol").required(true);
    product.changeFieldControl("slug", "builtin", "slugEditor");

    product.createField("categories")
        .name("Categories")
        .type("Array")
        .items({
            type: "Link",
            linkType: "Entry",
            validations: [{ linkContentType: ["category"] }],
        });

    product.createField("description")
        .name("Description")
        .type("RichText")
        .validations([
            {
                enabledNodeTypes: [
                    "heading-1",
                    "heading-2",
                    "heading-3",
                    "heading-4",
                    "heading-5",
                    "heading-6",
                    "ordered-list",
                    "unordered-list",
                    "hr",
                    "blockquote",
                    "embedded-entry-block",
                    "embedded-asset-block",
                    "hyperlink",
                    "entry-hyperlink",
                    "asset-hyperlink",
                    "embedded-entry-inline",
                ],
            },
            {
                enabledMarks: ["bold", "italic", "underline", "code"],
            },
        ]);

    product.createField("price").name("Price").type("Number").required(true);

    product.createField("image")
        .name("Image")
        .type("Link")
        .linkType("Asset")
        .required(true);
};