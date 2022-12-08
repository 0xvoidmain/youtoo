import * as yup from 'yup'

export const createChallegeSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  tokenAmount: yup.number().required(),
  minDepositAmount: yup.number().required(),
  timeframe: yup.string().required(),
  numberOfTimeFrame: yup.string().required(),
  startAt: yup.date().required(),
})
