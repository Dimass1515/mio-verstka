import { RequestHandler } from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listProducts: RequestHandler = async (req, res, next) => {
  try {
    const page = Number(req.query.page ?? 1) || 1;
    const pageSize = Number(req.query.pageSize ?? 20) || 20;
    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where: { active: true },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.product.count({ where: { active: true } }),
    ]);
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


