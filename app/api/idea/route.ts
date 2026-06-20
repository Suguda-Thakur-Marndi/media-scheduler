import { getInsforgeServerClient } from "@/lib/insforge-server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const { insforge, userId } = await getInsforgeServerClient();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const [ideasRes, groupsRes] = await Promise.all([
         insforge.database
         .from("ideas")
         .select("*")
         .eq("user_id", userId)
         .order("sort_order", { ascending: true })
         .order("created_at", { ascending: false }),
         insforge.database
         .from("idea_groups")
         .select("*")
         .order("created_at", { ascending: false })
    ])

    if (ideasRes.error || groupsRes.error) {
        console.error("Error fetching ideas or groups:", ideasRes.error, groupsRes.error);
        return NextResponse.json({ error: "Failed to fetch ideas or groups" }, { status: 500 });
    }

    const ideas = ideasRes.data ?? [];
    let dbGroups = groupsRes.data ?? [];

    if (dbGroups.length === 0) {
        // Create a default group if none exists
        const { data: newGroup, error: insertError } = await insforge.database
            .from("idea_groups")
            .insert([{ user_id: userId, name: "Ideas" }])
            .select()
            .single();
            
        if (!insertError && newGroup) {
            dbGroups = [newGroup];
        }
    }

    const groups = dbGroups.map((group) => ({
        id: group.id,
        title: group.name,
        ideas:ideas
            .filter((idea) => idea.group_id === group.id)
            .map((idea) => ({
                id: idea.id,
                title: idea.title,
                description: idea.description,
                images: idea.images ?? [],
                columnId: idea.group_id,
                sortOrder: idea.sort_order
            }))
    }))

    return NextResponse.json({ groups });
    } catch (error) {
        console.error("Error fetching ideas or groups:", error);
        return NextResponse.json({ error: "Failed to fetch ideas or groups" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { insforge, userId } = await getInsforgeServerClient();
        if (!userId) {
            return NextResponse.json({ error: "User not found" }, { status: 401 });
        }

        const {
            id,
            title,
            groupId,
            description,
            images,
            sortOrder
        } = await request.json();

        if (!title) {
            return NextResponse.json({ error: "Missing required fields: title is required" }, { status: 400 });
        }

        let targetGroupId = groupId;
        if (!targetGroupId) {
            const { data: existingGroup } = await insforge.database
                .from("idea_groups")
                .select("id")
                .eq("user_id", userId)
                .order("created_at", { ascending: true })
                .limit(1)
                .single();
            
            if (existingGroup) {
                targetGroupId = existingGroup.id;
            } else {
                const { data: newGroup, error: groupCreateError } = await insforge.database
                    .from("idea_groups")
                    .insert([{ user_id: userId, name: "Ideas" }])
                    .select("id")
                    .single();
                
                if (groupCreateError) {
                    return NextResponse.json({ error: `Failed to create default group: ${groupCreateError.message}` }, { status: 500 });
                }

                targetGroupId = newGroup?.id;
            }

            if (!targetGroupId) {
                 return NextResponse.json({ error: "Missing required fields: no idea groups available" }, { status: 400 });
            }
        }

        const payload = {
            user_id: userId,
            group_id: targetGroupId,
            title: title,
            description,
            images: images,
            sort_order: typeof sortOrder === 'number' ? sortOrder : 0
        };

        let data, error;

        if (id) {
            const result = await insforge.database
                .from("ideas")
                .update(payload)
                .eq("id", id)
                .eq("user_id", userId)
                .select()
                .single();

            data = result.data;
            error = result.error;
        } else {
            const result = await insforge.database
                .from("ideas")
                .insert([payload])
                .select()
                .single();
            data = result.data;
            error = result.error;
        }

        if (error) {
            console.error("Error upserting idea:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data });

    } catch (error) {
        console.error("Error upserting idea:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
