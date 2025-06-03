import { env } from '../config/env.config'

export default function validateEnv() {
    if (!env.PORT) {
        throw new Error('PORT is not defined in env')
    }
    if (!env.CLIENT_URL) {
        throw new Error('CLIENT_URL is not defined in env')
    }
}