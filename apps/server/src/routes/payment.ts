import { Elysia, t } from 'elysia'
import { paymentController } from '@/controller/payment'
import type { ICreatePayment } from '@/types/payment'
const app = new Elysia()
    .post("create", ({ body, headers }) => paymentController.createOrValidatePayment(body as ICreatePayment, headers), {
        tags: ["Payment"],
        detail: {
            description: "Create payment requirements for a resource"
        },
        headers: t.Object({
            "x-payment": t.Optional(t.String())
        }),
        body: t.Object({
            description: t.Optional(t.String()),
            price: t.Union([
                t.Union([t.String(), t.Number()], { description: "Amount in usd", title: "USD Amount", default: "0.1" }),
                t.Object({
                    amount: t.String(),
                    asset: t.Object({
                        address: t.String(),
                        decimals: t.Number(),
                        eip712: t.Optional(t.Object({
                            name: t.String(),
                            version: t.String()
                        }))
                    })
                }, { description: "ERC20 Token Amount", title: "ERC20 Token" }),
                t.Object({
                    amount: t.String(),
                    asset: t.Object({
                        address: t.String(),
                        decimals: t.Number()
                    })
                }, { description: "SPL Token Amount", title: "SPL Token" })
            ]),
            resource: t.String({ description: "The resource the payment" }),
            payTo: t.String({ description: "The address to pay to" }),
            network: t.String({ description: "The network to use for the payment", default: "base-sepolia" }),
            maxTimeoutSeconds: t.Number({ default: 120 }),
        })
    })
export default app