import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from './init'
import { prisma } from '@/db'

import type { TRPCRouterRecord } from '@trpc/server'

// Categories Router
const categoriesRouter = {
  list: publicProcedure.query(async () => {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: [
        { sortOrder: 'asc' },
        { name: 'asc' }
      ],
      include: {
        children: {
          where: { isActive: true },
          orderBy: [
            { sortOrder: 'asc' },
            { name: 'asc' }
          ]
        },
        _count: {
          select: {
            products: {
              where: { isActive: true }
            }
          }
        }
      }
    })
    return categories
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }).optional())
    .query(async ({ input }) => {
      if (!input?.slug) return null

      const category = await prisma.category.findFirst({
        where: {
          slug: input.slug,
          isActive: true
        },
        include: {
          parent: true,
          children: {
            where: { isActive: true },
            orderBy: [
              { sortOrder: 'asc' },
              { name: 'asc' }
            ]
          },
          products: {
            where: { isActive: true },
            include: {
              images: {
                orderBy: { sortOrder: 'asc' }
              },
              inventory: true
            },
            orderBy: { createdAt: 'desc' }
          }
        }
      })
      return category
    }),
} satisfies TRPCRouterRecord

// Products Router
const productsRouter = {
  list: publicProcedure
    .input(z.object({
      categoryId: z.string().optional(),
      featured: z.boolean().optional(),
      limit: z.number().min(1).max(100).optional().default(20),
      offset: z.number().min(0).optional().default(0)
    }).optional().default({ limit: 20, offset: 0 }))
    .query(async ({ input }) => {
      const where = {
        isActive: true,
        ...(input.categoryId && { categoryId: input.categoryId }),
        ...(input.featured && { isFeatured: true })
      }

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          include: {
            category: true,
            images: {
              orderBy: { sortOrder: 'asc' }
            },
            inventory: true
          },
          orderBy: { createdAt: 'desc' },
          take: input.limit,
          skip: input.offset
        }),
        prisma.product.count({ where })
      ])

      return {
        products,
        total,
        hasMore: total > input.offset + input.limit
      }
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }).optional())
    .query(async ({ input }) => {
      if (!input?.slug) return null

      const product = await prisma.product.findFirst({
        where: {
          slug: input.slug,
          isActive: true
        },
        include: {
          category: true,
          images: {
            orderBy: { sortOrder: 'asc' }
          },
          inventory: true,
          reviews: {
            where: { isApproved: true },
            include: {
              user: {
                select: {
                  name: true
                }
              }
            },
            orderBy: { createdAt: 'desc' },
            take: 10
          }
        }
      })
      return product
    }),

  featured: publicProcedure
    .input(z.object({
      limit: z.number().min(1).max(20).optional().default(8)
    }).optional().default({ limit: 8 }))
    .query(async ({ input }) => {
      const products = await prisma.product.findMany({
        where: {
          isActive: true,
          isFeatured: true
        },
        include: {
          category: true,
          images: {
            orderBy: { sortOrder: 'asc' }
          },
          inventory: true
        },
        orderBy: { createdAt: 'desc' },
        take: input.limit
      })
      return products
    }),

  search: publicProcedure
    .input(z.object({
      query: z.string().min(1),
      categoryId: z.string().optional(),
      limit: z.number().min(1).max(50).optional().default(20)
    }))
    .query(async ({ input }) => {
      const where = {
        isActive: true,
        AND: [
          {
            OR: [
              { name: { contains: input.query, mode: 'insensitive' } },
              { description: { contains: input.query, mode: 'insensitive' } },
              { shortDesc: { contains: input.query, mode: 'insensitive' } },
              { tags: { contains: input.query, mode: 'insensitive' } },
              { sku: { contains: input.query, mode: 'insensitive' } }
            ]
          },
          ...(input.categoryId ? [{ categoryId: input.categoryId }] : [])
        ]
      }

      const products = await prisma.product.findMany({
        where,
        include: {
          category: true,
          images: {
            orderBy: { sortOrder: 'asc' }
          },
          inventory: true
        },
        orderBy: { createdAt: 'desc' },
        take: input.limit
      })
      return products
    }),
} satisfies TRPCRouterRecord

export const trpcRouter = createTRPCRouter({
  categories: categoriesRouter,
  products: productsRouter,
})
export type TRPCRouter = typeof trpcRouter
