import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getChats = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("chats")
      .withIndex("by_projectId", (q) => q.eq("projectId", args.projectId))
      .collect();
  }
});

export const createChat = mutation({
  args: { projectId: v.id("projects"), title: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("chats", {
      projectId: args.projectId,
      title: args.title,
      updatedAt: Date.now()
    });
  }
});
