import React from 'react'
import { connect } from 'react-redux'

//The comments component
const Comment = ({comment}) => {
    return(
        <div>
            <b>Comments: </b> {comment}
        </div>
    )
}

export default Comment
