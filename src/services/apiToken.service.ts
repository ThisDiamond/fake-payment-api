
export async function getApiTokenbyApiTokenAdress(ApiTokenAdress: string) {
    return await prisma.apiToken.findFirst({
        where: {
            apiToken: ApiTokenAdress
        }
    })
}