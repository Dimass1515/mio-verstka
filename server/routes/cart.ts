import { RequestHandler } from "express";
import { z } from "zod";
import pkg from "@prisma/client";
const { PrismaClient } = pkg as unknown as { PrismaClient: new () => any };

const prisma = new PrismaClient();

function getSessionId(req: any) {
  return req.session?.id as string | undefined;
}

async function getOrCreateCart(sessionId?: string, userId?: string) {
  if (!sessionId && !userId) throw new Error("missing_session");
  let cart = await prisma.cart.findFirst({ where: { OR: [{ sessionId }, { userId }] }, include: { items: true } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { sessionId, userId } });
  }
  return cart;
}

export const getCart: RequestHandler = async (req, res, next) => {
  try {
    const sessionId = getSessionId(req);
    const cart = await getOrCreateCart(sessionId);
    const full = await prisma.cart.findUnique({ where: { id: cart.id }, include: { items: { include: { product: true } } } });
    res.json(full);
  } catch (e) {
    next(e);
  }
};

const upsertSchema = z.object({ productId: z.string(), quantity: z.number().int().min(1).max(10) });

export const upsertItem: RequestHandler = async (req, res, next) => {
  try {
    const parse = upsertSchema.safeParse(req.body);
    if (!parse.success) return res.status(400).json({ error: "invalid", details: parse.error.flatten() });
    const { productId, quantity } = parse.data;
    const sessionId = getSessionId(req);
    const cart = await getOrCreateCart(sessionId);

    const existing = await prisma.cartItem.findFirst({ where: { cartId: cart.id, productId } });
    let item;
    if (existing) {
      item = await prisma.cartItem.update({ where: { id: existing.id }, data: { quantity } });
    } else {
      item = await prisma.cartItem.create({ data: { cartId: cart.id, productId, quantity } });
    }
    res.status(201).json(item);
  } catch (e) {
    next(e);
  }
};

const patchSchema = z.object({ quantity: z.number().int().min(1).max(10) });

export const patchItem: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params as { id: string };
    const parse = patchSchema.safeParse(req.body);
    if (!parse.success) return res.status(400).json({ error: "invalid", details: parse.error.flatten() });
    const item = await prisma.cartItem.update({ where: { id }, data: { quantity: parse.data.quantity } });
    res.json(item);
  } catch (e) {
    next(e);
  }
};

export const deleteItem: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params as { id: string };
    await prisma.cartItem.delete({ where: { id } });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

export const clearCart: RequestHandler = async (req, res, next) => {
  try {
    const sessionId = getSessionId(req);
    const cart = await getOrCreateCart(sessionId);
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};


