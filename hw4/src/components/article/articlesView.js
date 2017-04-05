import React from 'react'
import { connect } from 'react-redux'
import Comment from './comment'

//The component of individual article card
const ArticleView = ({article_text, article_date, article_imgloc, article_comments, article_author}) => {
    let comments = {article_comments}
    let postDate = new Date(article_date)
    let postdate = postDate.getFullYear()+'-'+(postDate.getMonth()+1)+'-'+postDate.getDate()

    return(
        <div id="eachCard">
            <div>
                <span id="articleAuthor"><b>{article_author}</b></span>&nbsp;
                <span>posted on {postdate}:</span>
            </div>
            <div id="articleText">{article_text}</div>
            <div id="cardImg">
                <img className="img-rounded" src={article_imgloc} />
            </div>
            <div className="btn-group" role="group" aria-label="...">
                <input type="button" className="btn btn-success" value="Comment" />
                <input type="button" className="btn btn-success" value="Edit Article" />
            </div>
            <div> {
                comments.article_comments.map((comment) => (
                    <Comment comment={comment} />
                ))
            }
            </div>
        </div>
    )
}

export default ArticleView
