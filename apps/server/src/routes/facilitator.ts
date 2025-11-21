import { Elysia, t } from 'elysia'
import { paymentService } from '@/services/payment'
import type { PaymentPayload, PaymentRequirements } from 'x402/types'
const app = new Elysia()
    .get("supported", () => paymentService.getSupportedKinds(), {
        tags: ["Facilitator"],
        detail: {
            description: "Get supported payment kinds"
        },
        response: {
            200: t.Array(t.Object({
                x402Version: t.Number(),
                scheme: t.String(),
                network: t.String(),
                extra: t.Optional(t.Record(t.String(), t.Any()))
            }))
        }
    })
    .post("verify", async ({ body }) => paymentService.verifyPayment(body.paymentPayload as PaymentPayload, body.paymentRequirements as PaymentRequirements), {
        tags: ["Facilitator"],
        detail: {
            description: "Verify a payment payload"
        },
        body: t.Object({
            paymentPayload: t.Object({
                scheme: t.Literal("exact"),
                network: t.String(),
                x402Version: t.Number(),
                payload: t.Union([
                    t.Object({
                        signature: t.String(),
                        authorization: t.Object({
                            from: t.String(),
                            to: t.String(),
                            value: t.String(),
                            validAfter: t.String(),
                            validBefore: t.String(),
                            nonce: t.String()
                        })
                    }),
                    t.Object({
                        transaction: t.String()
                    })
                ])
            }),
            paymentRequirements: t.Object({
                scheme: t.Literal("exact"),
                description: t.String(),
                asset: t.String(),
                maxAmountRequired: t.String(),
                network: t.String(),
                resource: t.String(),
                mimeType: t.String(),
                payTo: t.String(),
                maxTimeoutSeconds: t.Number(),
                outputSchema: t.Optional(t.Record(t.String(), t.Any())),
                extra: t.Optional(t.Record(t.String(), t.Any())),
            })
        })
    })
    .post("settle", async ({ body }) => paymentService.settlePayment(body.paymentPayload as PaymentPayload, body.paymentRequirements as PaymentRequirements), {
        tags: ["Facilitator"],
        detail: {
            description: "Settle a payment payload"
        },
        body: t.Object({
            paymentPayload: t.Object({
                scheme: t.Literal("exact"),
                network: t.String(),
                x402Version: t.Number(),
                payload: t.Union([
                    t.Object({
                        signature: t.String(),
                        authorization: t.Object({
                            from: t.String(),
                            to: t.String(),
                            value: t.String(),
                            validAfter: t.String(),
                            validBefore: t.String(),
                            nonce: t.String()
                        })
                    }),
                    t.Object({
                        transaction: t.String()
                    })
                ])
            }),
            paymentRequirements: t.Object({
                scheme: t.Literal("exact"),
                description: t.String(),
                asset: t.String(),
                maxAmountRequired: t.String(),
                network: t.String(),
                resource: t.String(),
                mimeType: t.String(),
                payTo: t.String(),
                maxTimeoutSeconds: t.Number(),
                outputSchema: t.Optional(t.Record(t.String(), t.Any())),
                extra: t.Optional(t.Record(t.String(), t.Any())),
            })
        })
    })
export default app