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

// Reviews Router
const reviewsRouter = {
  getByProduct: publicProcedure
    .input(z.object({
      productId: z.string(),
      limit: z.number().min(1).max(50).optional().default(20),
      offset: z.number().min(0).optional().default(0),
      rating: z.number().min(1).max(5).optional()
    }))
    .query(async ({ input }) => {
      const where = {
        productId: input.productId,
        isApproved: true,
        ...(input.rating && { rating: input.rating })
      }

      const [reviews, total] = await Promise.all([
        prisma.productReview.findMany({
          where,
          include: {
            user: {
              select: {
                name: true
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: input.limit,
          skip: input.offset
        }),
        prisma.productReview.count({ where })
      ])

      return {
        reviews,
        total,
        hasMore: total > input.offset + input.limit
      }
    }),

  getRatingDistribution: publicProcedure
    .input(z.object({ productId: z.string() }))
    .query(async ({ input }) => {
      const distribution = await prisma.productReview.groupBy({
        by: ['rating'],
        where: {
          productId: input.productId,
          isApproved: true
        },
        _count: {
          rating: true
        }
      })

      const result = [5, 4, 3, 2, 1].map(rating => {
        const found = distribution.find(d => d.rating === rating)
        return {
          rating,
          count: found?._count.rating || 0
        }
      })

      const totalReviews = result.reduce((sum, item) => sum + item.count, 0)
      const averageRating = totalReviews > 0
        ? result.reduce((sum, item) => sum + (item.rating * item.count), 0) / totalReviews
        : 0

      return {
        distribution,
        totalReviews,
        averageRating
      }
    }),

  create: publicProcedure
    .input(z.object({
      productId: z.string(),
      userId: z.string(),
      rating: z.number().min(1).max(5),
      title: z.string().optional(),
      comment: z.string().optional()
    }))
    .mutation(async ({ input }) => {
      const review = await prisma.productReview.create({
        data: {
          ...input,
          isApproved: false // Reviews need approval
        },
        include: {
          user: {
            select: {
              name: true
            }
          }
        }
      })

      return review
    })
} satisfies TRPCRouterRecord

// Questions Router
const questionsRouter = {
  getByProduct: publicProcedure
    .input(z.object({
      productId: z.string(),
      limit: z.number().min(1).max(50).optional().default(20),
      offset: z.number().min(0).optional().default(0)
    }))
    .query(async ({ input }) => {
      const [questions, total] = await Promise.all([
        prisma.productQuestion.findMany({
          where: { productId: input.productId },
          include: {
            user: {
              select: {
                name: true
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: input.limit,
          skip: input.offset
        }),
        prisma.productQuestion.count({ where: { productId: input.productId } })
      ])

      return {
        questions,
        total,
        hasMore: total > input.offset + input.limit
      }
    }),

  create: publicProcedure
    .input(z.object({
      productId: z.string(),
      userId: z.string(),
      question: z.string().min(1)
    }))
    .mutation(async ({ input }) => {
      const question = await prisma.productQuestion.create({
        data: {
          ...input,
          isApproved: false
        },
        include: {
          user: {
            select: {
              name: true
            }
          }
        }
      })

      return question
    })
} satisfies TRPCRouterRecord

export const trpcRouter = createTRPCRouter({
  categories: categoriesRouter,
  products: productsRouter,
  reviews: reviewsRouter,
  questions: questionsRouter,
})
export type TRPCRouter = typeof trpcRouter
