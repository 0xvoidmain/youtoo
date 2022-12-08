interface IChallengeParams {
    key: string
    name: string
    description: string
    type: string | string[]
}

interface IComment {
    userId: string,
    name: string, 
    comment: string,
    likes: number
}

interface IExtraData_BuyTokenChallenge {
    amount: number
    price: number
}

interface IChallengeProof {
    submitedAt: number
    image: string
    content: string
    likes: number
    comments: IComment[]
    extraData: any

    verified: boolean
}

interface IChallengePlayer {
    name: string
    joinedAt: number
    
    proofOfWorks: IChallengeProof[]
}

interface IChallenge {
    creator: string
    name: string
    description: string
    guide: {
        description: string
        params: {
            [key: string]: any
        }
    }
    params: {
        [key: string]: any
    }
    participants: number
    players: {
        [userId: string]: IChallengePlayer
    },
    likes: number
    comments: IComment[]
    template: any
}