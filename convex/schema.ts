import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    plan: v.union(v.literal("free"), v.literal("pro")),
    tokenUsage: v.number(),
    createdAt: v.number(),
    // We could store the Clerk user ID as a separate field or use it as the custom subject ID
    clerkId: v.optional(v.string())
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_email", ["email"]),
    
  projects: defineTable({
    userId: v.id("users"),
    name: v.string(),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"]),
    
  files: defineTable({
    projectId: v.id("projects"),
    fileName: v.string(), // Includes path like utils/helper.ts
    language: v.string(),
    content: v.string(),
    updatedAt: v.number(),
  })
    .index("by_projectId", ["projectId"]),
    
  chats: defineTable({
    projectId: v.id("projects"),
    title: v.string(),
    updatedAt: v.number(),
  })
    .index("by_projectId", ["projectId"]),
    
  messages: defineTable({
    chatId: v.id("chats"),
    role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
    content: v.string(),
    tokenCount: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_chatId", ["chatId"]),
    
  canvasDocs: defineTable({
    projectId: v.id("projects"),
    content: v.string(),
    version: v.number(),
    updatedAt: v.number(),
  })
    .index("by_projectId", ["projectId"]),
    
  resources: defineTable({
    projectId: v.id("projects"),
    storageId: v.id("_storage"),
    name: v.string(),
    type: v.string(),
    createdAt: v.number(),
  })
    .index("by_projectId", ["projectId"]),
});
