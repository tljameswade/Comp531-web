
//The article reducer to keep track of articles being shown
const articleReducer = (state = {
    nextArticleId: 9000000,
    articles: {},
    avatars:{},
    searchText: '',
    allArticles: {}
}
, action) => {
    let thisdate = new Date()

    switch (action.type) {
        case 'To_Landing':
            return {
                nextArticleId: 9000000,
                articles: {},
                avatars:{},
                searchText: '',
                allArticles: {}
            }
        case 'Update_Articles':
            return {
                ...state,
                articles: action.realarticles,
                allArticles: action.realarticles
            }
        case 'Filter_Article':
            return {
                ...state,
                searchText: action.searchText,
                articles: action.articles
            }

        case 'Update_Avatars':
            return {
                ...state,
                avatars: action.avatars
            }
        case 'Add_New_Article':
            return {
                ...state,
                nextArticleId: state.nextArticleId + 1,
                articles: [
                    ...state.articles,
                    {
                        text: action.newArticle,
                        _id: state.nextArticleId,
                        date: thisdate,
                        author: action.author,
                        comments: [],

                    }
                ],
                allArticles: [
                    ...state.allArticles,
                    {
                        text: action.newArticle,
                        _id: state.nextArticleId,
                        date: thisdate,
                        author: action.author,
                        comments: [],

                    }
                ]
            }

        case 'Search_Text':
            return {
                ...state,               
                searchText: action.searchText
            }

        case 'Show_comments':
            return {
                ...state,
                articles: state.articles.map(commArticle => {
                    if (commArticle._id == action.commId) {
                        return {
                            ...commArticle, article_showcomm : action.commStatus
                        }                        
                    }
                    else {
                        return commArticle
                    }
                })
            }
    }
    return state
}

export default articleReducer
