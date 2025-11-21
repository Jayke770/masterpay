import { envConfig } from "@/lib/environment";
import { withPaymentInterceptor } from "x402-axios";
import axios from "axios";
import { wrapFetchWithPayment, decodeXPaymentResponse, createSigner } from "x402-fetch";
const account = await createSigner("base-sepolia", "");
const fetchWithPayment = wrapFetchWithPayment(fetch, account);
const response = await fetchWithPayment("http://localhost:1000/payment/create", {
    method: "POST",
    body: JSON.stringify({
        "description": "",
        "price": "0.1",
        "resource": "http://localhost:1000",
        "payTo": "0x379f8d913A7C39B5d1A538C6B3008edb814edc6C",
        "network": "base-sepolia",
        "maxTimeoutSeconds": 300
    }),
    headers: {
        "Content-Type": "application/json"
    }
});
const body = await response.json();
console.log(body);