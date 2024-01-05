import JWT from "jsonwebtoken";

export const auth = (request, response, next) => {

    try {
        const token = request.header("Authentication")

        JWT.verify(token, process.env.SECRET_KEY)
        next()

    } catch (error) {
       response.status(401).send({message: error.message})
    }

}