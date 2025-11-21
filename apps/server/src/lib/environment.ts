import { z } from 'zod'
const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(1000),
    RPC: z.record(z.string(), z.url()),
    PRIVATE_KEY: z.record(z.string(), z.string()),
    DATABASE_URL: z.url(),
    FACILITATOR_URL: z.url().default('http://localhost:1000')
})
export const envConfig = envSchema.parse({
    ...process.env,
    RPC: Object.fromEntries(
        Object.entries(process.env)
            .filter(([key]) => key.startsWith('RPC_'))
            .map(([key, value]) => [key, value])
    ),
    PRIVATE_KEY: Object.fromEntries(
        Object.entries(process.env)
            .filter(([key]) => key.startsWith('PRIVATE_KEY_'))
            .map(([key, value]) => [key, value])
    )
})