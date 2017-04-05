import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Comment from './comment'
import { updateCommStatus } from './articleactions'

//The component of individual article card
const ArticleView = ({article_avatar, article_text, article_date, article_imgloc, article_comments, article_author, article_showcomm, article_id, updateCommStatus}) => {
    let comments = {article_comments}
    let postDate = new Date(article_date)
    let postdate = postDate.getFullYear()+'-'+(postDate.getMonth()+1)+'-'+postDate.getDate()
    let posttime = postDate.getHours()+':'+postDate.getMinutes()

    return(
        <div id="eachCard">
            <div>
                <img className="articleAvatar img-circle" src={article_avatar} />
                <span id="articleAuthor"><b>{article_author}</b></span>&nbsp;
                <span> posted on {postdate} at {posttime}</span>
            </div>
            <div id="articleText">{article_text}</div>
            <div id="cardImg">
                <img className="img-rounded" src={article_imgloc} />
            </div>
            <div className="btn-group" role="group" aria-label="...">
                <button type="button" className="btn btn-success" onClick={ ()=> {
                    article_showcomm=!article_showcomm 
                    updateCommStatus(article_id, article_showcomm) }}>
                    {article_showcomm?"Hide Comments":"Show Comments" + " (" + article_comments.length + ")"}</button>
                <button type="button" className="btn btn-success">Edit Text</button>
            </div>
            <div>
                {
                    !article_showcomm?"":
                    article_comments.sort((a, b) => {
                        return Date.parse(a.date) < Date.parse(b.date) ? 1 : -1
                    }).map((comment) => (
                        <Comment key={comment.commentId} commId={comment.commentId} author={comment.author}
                        text={comment.text} date={comment.date}/>
                    ))
                }
            </div>
        </div>
    )
}


export default connect(
    null,
    (dispatch) => {
        return {
            updateCommStatus: (id, commStatus) => dispatch(updateCommStatus(id, commStatus))
        }
    }
)(ArticleView)


