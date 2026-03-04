import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const saveResource = mutation({
  args: { 
    projectId: v.id("projects"), 
    storageId: v.id("_storage"), 
    name: v.string(), 
    type: v.string() 
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("resources", {
      projectId: args.projectId,
      storageId: args.storageId,
      name: args.name,
      type: args.type,
      createdAt: Date.now()
    });
  }
});

export const getResources = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const resources = await ctx.db
      .query("resources")
      .withIndex("by_projectId", (q) => q.eq("projectId", args.projectId))
      .collect();
      
    // Fetch URLs map
    return Promise.all(
      resources.map(async (r) => ({
        ...r,
        url: await ctx.storage.getUrl(r.storageId),
      }))
    );
  }
});
