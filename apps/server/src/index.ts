import { Elysia } from "elysia";
import { envConfig } from "@/lib/environment"
import { autoload } from "elysia-autoload";
import { openapi } from '@elysiajs/openapi'
import pkg from "@pkg"
const app = new Elysia()
  .use(await autoload({
    dir: "./routes",
    prefix: "/api",
    // Ignore test files and spec files
    ignore: ["**/*.test.ts", "**/*.spec.ts"]
  }))
  .use(openapi({
    enabled: envConfig.NODE_ENV === 'development',
    documentation: {
      info: {
        title: "Master Pay API",
        description: pkg.description,
        version: pkg.version
      }
    }
  }))
  .get("/", () => "Ok", {
    tags: ["Health"],
  })
  .listen(envConfig.PORT);