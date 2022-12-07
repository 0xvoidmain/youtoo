import { find } from 'lodash'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '..'

import { ChallengeStatus, IAuth, IBinanceInfo, IChallange } from './types'

export interface InitialAppReducerState {
  challenges: IChallange[]
  binanceInfo: IBinanceInfo
  auth: IAuth
}

const initialState: InitialAppReducerState = {
  challenges: [
    {
      id: 1,
      title: 'Chống đẩy 30 lần',
      challangeDescription:
        'Chống đẩy mỗi ngày để ngực đẹp hơn nào baby. Chống đẩy 30 ngày liên tục, ngực đẹp hơn nhiều lắm các bạn ơi',
      prize: 5000,
      minCommittedAmount: 20,
      numberOfCommittedPeople: 300,
      time: 'từ 1/1/2022 đến 1/2/2022',
      type: 'Joined',
    },
    {
      id: 2,
      title: 'Mua 5 SOL mỗi ngày',
      challangeDescription: 'Mua 5 SOL mỗi ngày để trở thành tỷ phú sau 2 năm nữa các bạn ơi',
      prize: 5000,
      minCommittedAmount: 20,
      numberOfCommittedPeople: 3000,
      time: 'từ 1/1/2022 đến 1/2/2022',
      type: 'Ongoing',
    },
    {
      id: 3,
      title: 'Đi bộ 5000 bước',
      challangeDescription: 'Mua 5 SOL mỗi ngày để trở thành tỷ phú sau 2 năm nữa các bạn ơi',
      prize: 5000,
      minCommittedAmount: 20,
      numberOfCommittedPeople: 3000,
      time: 'từ 1/1/2022 đến 1/2/2022',
      type: 'Soon',
    },
    {
      id: 4,
      title: 'Đoc tiểu thuyết sự im lặng của bầy cừu',
      challangeDescription: 'Mua 5 SOL mỗi ngày để trở thành tỷ phú sau 2 năm nữa các bạn ơi',
      prize: 5000,
      minCommittedAmount: 20,
      numberOfCommittedPeople: 3000,
      time: 'từ 1/1/2022 đến 1/2/2022',
      type: 'Soon',
    },
  ],
  binanceInfo: {
    apiKey: '',
    apiSecret: '',
  },
  auth: {
    AccessToken: '',
    AccessTokenExpireTime: 0,
  },
}

export const appSlice = createSlice({
  name: 'App',
  initialState,
  reducers: {
    setType: (
      state,
      action: PayloadAction<{
        id: number
        type: ChallengeStatus
      }>,
    ) => {
      state.challenges = state.challenges.map((c) => {
        if (c.id === action.payload.id) {
          return {
            ...c,
            type: action.payload.type,
          }
        }

        return c
      })
    },
    setBinanceKey: (
      state,
      action: PayloadAction<{
        apiKey: string
        apiSecret: string
      }>,
    ) => {
      const { apiKey, apiSecret } = action.payload
      state.binanceInfo = {
        apiKey,
        apiSecret,
      }
    },
    setAuthInfo: (state, action: PayloadAction<IAuth>) => {
      const { AccessToken, AccessTokenExpireTime } = action.payload
      state.auth = {
        AccessToken,
        AccessTokenExpireTime,
      }
    },
  },
})

// Actions
export const { setType, setBinanceKey, setAuthInfo } = appSlice.actions

export const selectAppState = (state: RootState) => state.app
export const selectChallenges = (state: RootState) => selectAppState(state).challenges
export const selectBinanceInfo = (state: RootState) => selectAppState(state).binanceInfo
export const selectAuthInfo = (state: RootState) => selectAppState(state).auth

export default appSlice.reducer
