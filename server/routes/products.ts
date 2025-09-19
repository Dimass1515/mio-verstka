import { RequestHandler } from "express";
import { z } from "zod";
import pkg from "@prisma/client";
const { PrismaClient } = pkg as unknown as { PrismaClient: new () => any };

const prisma = new PrismaClient();

export const listProducts: RequestHandler = async (req, res, next) => {
  try {
    const page = Number(req.query.page ?? 1) || 1;
    const pageSize = Number(req.query.pageSize ?? 20) || 20;
    
    // Optimize query - only fetch what we need
    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where: { active: true },
        select: {
          id: true,
          slug: true,
          title_fr: true,
          title_en: true,
          title_ru: true,
          priceCents: true,
          imageUrl: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.product.count({ where: { active: true } }),
    ]);
    
    // Set cache headers for better performance
    res.set({
      'Cache-Control': 'public, max-age=300, s-maxage=600', // 5min browser, 10min CDN
      'ETag': `"products-${page}-${pageSize}-${total}"`,
    });
    
    res.json({ items, total, page, pageSize });
  } catch (e) {
    next(e);
  }
};

export const getProduct: RequestHandler = async (req, res, next) => {
  try {
    const { slug } = req.params as { slug: string };
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) return res.status(404).json({ error: "not_found" });
    res.json(product);
  } catch (e) {
    next(e);
  }
};


