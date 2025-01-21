import 'dotenv/config';
import contentfulManagement from 'contentful-management';
import test from './01-product.js';

const { createClient } = contentfulManagement;

const ACCESS_TOKEN = process.env.CMA_TOKEN;
const SPACE_ID = process.env.NEXT_PUBLIC_SPACE_ID;
const ENVIRONMENT_ID = process.env.NEXT_PUBLIC_ENVIRONMENT;


async function executeMigration() {
    try {
        // Create a Contentful management client
        const client = createClient({
            accessToken: ACCESS_TOKEN,
        });

        // Access the desired space and environment
        const space = await client.getSpace(SPACE_ID);
        const environment = await space.getEnvironment(ENVIRONMENT_ID);

        // Run the provided migration function
        await test(environment);
        console.log('Migration completed successfully.');
    } catch(err) {
        console.error('Failed to run migration:', err);
        process.exit(1);
    }
}

executeMigration();