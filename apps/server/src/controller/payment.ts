import type { ICreatePayment } from "@/types/payment";
import { paymentService } from '@/services/payment'
import { HTTPHeaders, status, StatusMap } from "elysia";
import { PaymentRequirementsSchema, settleResponseHeader, type PaymentPayload, type PaymentRequirements } from "x402/types";
import { exact } from "x402/schemes";
import { findMatchingPaymentRequirements } from "x402/shared";
import { ElysiaCookie } from "elysia/cookies";
class PaymentController {
    async createOrValidatePayment(
        params: ICreatePayment,
        headers: Record<string, string | string[] | undefined>,
        set: {
            headers: HTTPHeaders;
            status?: number | keyof StatusMap;
            /**
             * @deprecated Use inline redirect instead
             *
             * @example Migration example
             * ```ts
             * new Elysia()
             *     .get(({ redirect }) => redirect('/'))
             * ```
             */
            redirect?: string;
            /**
             * ! Internal Property
             *
             * Use `Context.cookie` instead
             */
            cookie?: Record<string, ElysiaCookie>;
        }
    ) {
        console.log("Received payment request with params:", params, "and headers:", headers);
        const xPayment = headers?.["x-payment"];
        if (!xPayment) {
            const payment = paymentService.createExactPaymentRequirements(params);
            return status(402, { x402Version: 1, error: "Payment required", accepts: [payment] })
        }
        let decodedPayment: PaymentPayload = exact.evm.decodePayment(xPayment as string);
        decodedPayment.x402Version = 1
        const selectedPaymentRequirement = findMatchingPaymentRequirements([paymentService.createExactPaymentRequirements(params)], decodedPayment);
        console.log("Selected payment requirement:", selectedPaymentRequirement);
        if (!selectedPaymentRequirement) {
            return status(400, { error: "No matching payment requirements found" });
        }
        const response = await paymentService.facilitator.settle(decodedPayment, selectedPaymentRequirement);  
        set.headers["X-PAYMENT-RESPONSE"] = settleResponseHeader(response)
        return response;
    }
}
export const paymentController = new PaymentController();