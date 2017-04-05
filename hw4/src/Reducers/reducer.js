import { combineReducers } from 'redux'
import FollowReducer from './followReducer'
import RegisterReducer from './registerReducer'
import LoginReducer from './loginReducer'
import LocationReducer from './locationReducer'
import OwnStatusReducer from './ownStatusReducer'
import ArticleReducer from './articleReducer'

//The overall reducer that combines all of the sub-reducers
const Reducer = combineReducers({
    FollowReducer,
    RegisterReducer,
    LoginReducer,
    LocationReducer,
    OwnStatusReducer,
    ArticleReducer
})


export default Reducer
