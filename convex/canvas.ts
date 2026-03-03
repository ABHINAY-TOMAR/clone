import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getCanvasDoc = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("canvasDocs")
      .withIndex("by_projectId", (q) => q.eq("projectId", args.projectId))
      .first();
  }
});

export const saveCanvasDoc = mutation({
  args: { projectId: v.id("projects"), content: v.string(), version: v.number() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("canvasDocs")
      .withIndex("by_projectId", (q) => q.eq("projectId", args.projectId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { content: args.content, version: args.version, updatedAt: Date.now() });
      return existing._id;
    }

    return await ctx.db.insert("canvasDocs", {
      projectId: args.projectId,
      content: args.content,
      version: args.version,
      updatedAt: Date.now()
    });
  }
});
