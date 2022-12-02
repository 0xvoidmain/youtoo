import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import find from 'lodash/find'

import { dummyChallanges, IChallange } from '../Home/AvailableChallenges'

export const CHALLENGE_DETAIL_ROUTE = '/challenge'

const ChallangeDetail = () => {
  const { challengeId } = useParams()

  const challengeDetail = useMemo<IChallange | Record<string, any>>(() => {
    return find(dummyChallanges, (c) => c.id === Number(challengeId)) || {}
  }, [challengeId])

  return <></>
}

export default ChallangeDetail
