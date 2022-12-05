import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '..'

import { IChallange } from './types'

export interface InitialAppReducerState {
  challenges: IChallange[]
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
}

export const appSlice = createSlice({
  name: 'App',
  initialState,
  reducers: {},
})

export const selectAppState = (state: RootState) => state.app
export const selectChallenges = (state: RootState) => selectAppState(state).challenges

export default appSlice.reducer
