import { createClient } from '@insforge/sdk';

const BASE_URL = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || process.env.INSFORGE_BASE_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || process.env.INSFORGE_ANON_KEY;
const PROJECT_API_KEY = process.env.INSFORGE_PROJECT_API_KEY || process.env.INSFORGE_API_KEY;

const client = createClient({
    baseUrl: BASE_URL as string,
    anonKey: PROJECT_API_KEY as string,
    isServerMode: true,
});

async function main() {
    const { data, error } = await client.database.from("idea_groups").select("*").limit(1);
    console.log("idea_groups:", data, "error:", error);
    
    // Also try inserting to see the error
    const { error: err2 } = await client.database.from("idea_groups").insert([{ name: "Ideas" }]);
    console.log("insert error:", err2);
    
    // Also try inserting with user_id
    const { error: err3 } = await client.database.from("idea_groups").insert([{ user_id: 'some-user', name: "Ideas" }]);
    console.log("insert with user_id error:", err3);
}

main().catch(console.error);
