
const initialArticles = require('../data/articles.json')

//The article reducer to keep track of articles being shown
const articleReducer = (state = {
    nextArticleId: 9000000,
    articles: initialArticles.articles,
    allArticles: initialArticles.articles
}
, action) => {
    let thisdate = new Date()
    let today = thisdate.getFullYear()+'-'+(thisdate.getMonth()+1)+'-'+thisdate.getDate()
    switch (action.type) {
        case 'Add_New_Article':
            return {
                nextArticleId: state.nextArticleId + 1,
                articles: [
                    ...state.articles,
                    {
                        _id: state.nextArticleId,
                        text: action.newArticle,
                        date: today,
                        author: action.author,
                        comments: []
                    }
                ],
                allArticles: [
                    ...state.allArticles,
                    {
                        _id: state.nextArticleId,
                        text: action.newArticle,
                        date: today,
                        author: action.author,
                        comments: []
                    }
                ]
            }

        case 'Search_Text':
            return {
                ...state,
                allArticles: state.allArticles,
                articles: state.allArticles.filter((filterarticle) => {
                    return filterarticle.text.toLowerCase().indexOf(action.searchText.toLowerCase()) >= 0 ||
                            filterarticle.author.toLowerCase().indexOf(action.searchText.toLowerCase()) >= 0
                })
            }

        case 'All_Articles':
            return {
                ...state,
                articles: state.allArticles,
            }
    }
    return state
}

export default articleReducer
