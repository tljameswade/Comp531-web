
const initialfollowing = require('../data/followers.json')

//The follow reducer to keep track of the people that the user is following
const followReducer = (state = {
    nextFollowerId: 5,
    followers: initialfollowing.followers
}
, action) => {
    switch (action.type) {
        case 'Unfollow':
            return {
                nextFollowerId: state.nextFollowerId,
                followers: state.followers.filter(
                    follower => {
                        return follower.id !== action.id
                    }
                )
            }
        case 'Add_Follower':
            return {
                nextFollowerId: state.nextFollowerId + 1,
                followers: [
                    ...state.followers,
                    {
                        id: state.nextFollowerId,
                        name: action.newFollower,
                        status: 'I am a new Follower being added!',
                        imgloc: 'http://a4.att.hudong.com/66/85/20300001128119147184859356582_s.jpg'
                    }
                ]
            }
        default:
            return state
    }
}

export default followReducer
