import 'dotenv/config';
import contentfulManagement from 'contentful-management';

const { createClient } = contentfulManagement;

const ACCESS_TOKEN = process.env.CMA_TOKEN;
const SPACE_ID = process.env.NEXT_PUBLIC_SPACE_ID;
const ENVIRONMENT_ID = process.env.NEXT_PUBLIC_ENVIRONMENT;

/**
 * Executes a migration function provided by an external file.
 * @param {Function} migrationFunction - The migration logic to run.
 */
async function executeMigration(migrationFunction) {
    // Create a Contentful management client
    const client = createClient({
        accessToken: ACCESS_TOKEN,
    });

    // Access the desired space and environment
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment(ENVIRONMENT_ID);

    // Run the provided migration function
    await migrationFunction(environment);
    console.log('Migration completed successfully.');
}

// Import the migration file dynamically
const migrationPath = process.argv[2]; // Pass the migration file path as a command-line argument
if (!migrationPath) {
    console.error('Please provide the path to the migration file as an argument.');
    process.exit(1);
}

import(migrationPath)
    .then((module) => {
        if (typeof module.default !== 'function') {
            console.error('Migration file must export a default function.');
            process.exit(1);
        }
        return executeMigration(module.default);
    })
    .catch((err) => {
        console.error('Failed to run migration:', err);
        process.exit(1);
    });