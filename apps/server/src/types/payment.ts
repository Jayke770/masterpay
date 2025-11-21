import type { Network, Price, Resource } from "x402/types";

export interface ICreatePayment {
    price: Price,
    network: Network,
    resource: Resource,
    payTo: string,
    description?: string,
    extra?: Record<string, any>,
    maxTimeoutSeconds: number
}