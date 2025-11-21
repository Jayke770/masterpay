import { envConfig } from "@/lib/environment";
import type { ICreatePayment } from "@/types/payment";
import { processPriceToAtomicAmount } from "x402/shared";
import {
    PaymentRequirementsSchema,
    type PaymentRequirements,
    type PaymentPayload,
    PaymentPayloadSchema,
    createConnectedClient,
    createSigner,
    SupportedEVMNetworks,
    SupportedSVMNetworks,
    Signer,
    ConnectedClient,
    SupportedPaymentKind,
    isSvmSignerWallet,
    type X402Config,
    SvmConfig,
    Price,
    Network,
    Resource
} from "x402/types";
import { useFacilitator } from "x402/verify";

import { verify, settle } from "x402/facilitator";

class PaymentService {
    private x402Config: X402Config = {
        svmConfig: {
            rpcUrl: envConfig.RPC.RPC_SOL
        }
    }
    facilitator = useFacilitator({
        url: envConfig.FACILITATOR_URL as Resource, 
        
    })

    createExactPaymentRequirements(params: ICreatePayment): PaymentRequirements {
        const atomicAmountForAsset = processPriceToAtomicAmount(params.price, params.network);
        if ("error" in atomicAmountForAsset) {
            throw new Error(atomicAmountForAsset.error);
        }
        const { maxAmountRequired, asset } = atomicAmountForAsset;
        return {
            scheme: "exact",
            network: params.network,
            maxAmountRequired,
            resource: params.resource,
            description: params.description ?? "",
            mimeType: "",
            payTo: params.payTo,
            maxTimeoutSeconds: params.maxTimeoutSeconds,
            asset: asset.address,
            extra: params.extra,
        };
    }
    async getSupportedKinds() {
        const signer = await createSigner("solana-devnet", envConfig.PRIVATE_KEY.PRIVATE_KEY_SOLANA);
        const feePayer = isSvmSignerWallet(signer) ? signer.address : undefined;
        let kinds: SupportedPaymentKind[] = [
            {
                x402Version: 1,
                scheme: "exact",
                network: "base-sepolia",
                extra: {
                }
            },
            {
                x402Version: 1,
                scheme: "exact",
                network: "base",
                extra: {
                }
            },
            {
                x402Version: 1,
                scheme: "exact",
                network: "solana-devnet",
                extra: {
                    feePayer,
                },
            },
            {
                x402Version: 1,
                scheme: "exact",
                network: "solana"
            }
        ];
        return kinds;
    }
    async verifyPayment(paymentPayload: PaymentPayload, paymentRequirements: PaymentRequirements) {
        console.log("Verifying payment with payload:", paymentPayload);
        console.log("Against requirements:", paymentRequirements);
        let signer: Signer;
        if (SupportedEVMNetworks.includes(paymentRequirements.network as Network)) {
            signer = await createSigner(paymentRequirements.network, envConfig.PRIVATE_KEY.PRIVATE_KEY_EVM);
        } else if (SupportedSVMNetworks.includes(paymentRequirements.network as Network)) {
            signer = await createSigner(paymentRequirements.network, envConfig.PRIVATE_KEY.PRIVATE_KEY_SOLANA);
        } else {
            throw new Error("Invalid network");
        }
        const valid = await verify(signer, paymentPayload, paymentRequirements, this.x402Config);
        return valid;
    }

    async settlePayment(paymentPayload: PaymentPayload, paymentRequirements: PaymentRequirements) {
        let signer: Signer;
        if (SupportedEVMNetworks.includes(paymentRequirements.network as Network)) {
            signer = await createSigner(paymentRequirements.network, envConfig.PRIVATE_KEY.PRIVATE_KEY_EVM);
        } else if (SupportedSVMNetworks.includes(paymentRequirements.network as Network)) {
            signer = await createSigner(paymentRequirements.network, envConfig.PRIVATE_KEY.PRIVATE_KEY_SOLANA);
        } else {
            throw new Error("Invalid network");
        }
        const settlementResult = await settle(signer, paymentPayload, paymentRequirements, this.x402Config);
        return settlementResult;
    }
}
export const paymentService = new PaymentService();