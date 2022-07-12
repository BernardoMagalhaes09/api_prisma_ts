import {sign} from "jsonwebtoken"

class GenerateTokenProvider {

    async execute(userId: string) {
        const token = sign({}, "3004b458-6598-4dfe-9237-fff3c7df9517", {
            subject: String(userId),
            expiresIn: "20s"
        })

        return token
    }
}

export { GenerateTokenProvider }