import devConfig from './devConfig'
import prodConfig from './prodConfig'

const env = process.env.REACT_APP_ENV
const configs = env === 'dev' ? devConfig : prodConfig
export default configs
