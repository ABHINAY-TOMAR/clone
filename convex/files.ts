import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveContent = mutation({
  args: {
    fileId: v.id("files"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.fileId, { 
      content: args.content,
      updatedAt: Date.now()
    });
  },
});

export const getFiles = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("files")
      .withIndex("by_projectId", (q) => q.eq("projectId", args.projectId))
      .collect();
  }
});

export const createFile = mutation({
  args: {
    projectId: v.id("projects"),
    fileName: v.string(),
    language: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("files", {
      projectId: args.projectId,
      fileName: args.fileName,
      language: args.language,
      content: "",
      updatedAt: Date.now(),
    });
  }
});
