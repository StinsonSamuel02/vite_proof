import React from 'react';
import axios from 'axios';

import Article from '../components/Article';
import BasicForm from '../components/Form';

class ArticleList extends React.Component {
    state = {
        articles: []
    }

    componentDidMount(){
        axios.get('http://127.0.0.1:8000/server/articles')
            .then(res => {
                console.log(res.data);
                this.setState({
                    articles: res.data
                });
            })
    }

    render() {
        return (
        <>
            <Article data={this.state.articles}/>
            <h2>Post new article</h2>
            <BasicForm requestMethod='post'/>
        </>
        )
    }
}

export default ArticleList;