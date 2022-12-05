export type ChallengeStatus = 'Joined' | 'Ongoing' | 'Soon'
export interface IChallange {
  title: string
  time: string
  prize: number
  challangeDescription: string
  minCommittedAmount: number
  numberOfCommittedPeople: number
  id: number
  type: ChallengeStatus
}
