import type { ICreatePayment } from "@/types/payment";
import { paymentService } from '@/services/payment'
import { status } from "elysia";
import { PaymentRequirementsSchema, type PaymentPayload, type PaymentRequirements } from "x402/types";
import { exact } from "x402/schemes";
import { findMatchingPaymentRequirements } from "x402/shared";
class PaymentController {
    async createOrValidatePayment(params: ICreatePayment, headers: Record<string, string | string[] | undefined>) {
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
        console.log("Payment verification response:", response);
    }
}
export const paymentController = new PaymentController();