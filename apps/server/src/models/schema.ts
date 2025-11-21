import * as p from "drizzle-orm/pg-core";
import type { Network } from "x402/types";
p
export const paymentSchema = p.pgTable("payments", {
    id: p.uuid().primaryKey().defaultRandom(),
    amount: p.numeric({ precision: 30, scale: 0, mode: "number" }).notNull(),
    assetAddress: p.text().notNull(),
    payTo: p.text().notNull(),
    network: p.text().notNull().$type<Network>(),
    createdAt: p.timestamp().defaultNow(),
    updatedAt: p.timestamp().defaultNow().$onUpdateFn(() => new Date()),
});