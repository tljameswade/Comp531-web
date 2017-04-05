import React from 'react'
import { connect } from 'react-redux'

//The comments component
const Comment = ({commId, author, text, date}) => {
    let commDate = new Date(date)
    let commdate = commDate.getFullYear()+'-'+(commDate.getMonth()+1)+'-'+commDate.getDate()
    let commtime = commDate.getHours()+':'+commDate.getMinutes()
    return(
        <ul className="collection">
            <li className="collection-item">
                <div><b>{author}</b> commented on {commdate} at {commtime}</div>
                <div>{text}</div>
            </li>   
        </ul>
    )
}

export default Comment
