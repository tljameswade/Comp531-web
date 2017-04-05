import React from 'react'
import { connect } from 'react-redux'
import ArticleView from './articlesView'

//The article component to show all the articles and images
const Article = ({articles, searchArticle, showAllArticle}) => {
    let inputSearch

    return(
        <div className="col-md-7" id='article'>
            <div className="input-group">
                <span className="input-group-btn">
                    <button className="btn btn-default" type="button" aria-label="Left Align">
                        <span className="glyphicon glyphicon-search"></span>
                    </button>
                </span>
                <input type="text" className="form-control" placeholder="Search here..."
                ref={(node) => inputSearch = node} onChange={() => {
                    if(inputSearch.value != '')
                        { searchArticle(inputSearch.value) }
                    else { showAllArticle() }
                    }}/>
            </div>
            <div>
                {
                    articles.sort((a, b) => {
                        return a.date < b.date ? 1 : a.date > b.date ? -1 : 0
                    }).map((article) => (
                        <ArticleView key={article._id} article_text={article.text} article_date={article.date}
                        article_imgloc={article.img} article_author={article.author} article_comments={article.comments}/>
                    ))
                }
            </div>
        </div>
    )
}

export default connect(
    (state) => {
        return {
            articles: state.ArticleReducer.articles,
        }
    },
    (dispatch) => {
        return {
            searchArticle: (searchText) => dispatch({ type: 'Search_Text', searchText }),
            showAllArticle: () => dispatch({ type: 'All_Articles' })
        }
    }
)(Article)
