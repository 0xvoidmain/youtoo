export interface IChallange {
  amount: number
  name: string
  numberOfTimeFrame: number
  startAt: number
  timeframe: string
  tokenName: string
  description: string
  depositAmount: number
  _id: string
}

export const defaultIChallengeValue: IChallange = {
  amount: 0,
  name: '',
  numberOfTimeFrame: 0,
  startAt: 0,
  timeframe: '',
  tokenName: '',
  depositAmount: 0,
  description: '',
  _id: '',
}
