import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Divider } from 'antd';
import { useParams } from 'react-router-dom';
import Article from '../components/Article';
import BasicForm from '../components/Form';

const ArticleDetail = () => {
    const [article, setArticle] = useState({});
    const { articleID } = useParams();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/server/articles/${articleID}`)
           .then(res => {
                console.log(res.data);
                setArticle(res.data);
            });
    }, [articleID]);

    return (
    <>
        <Card title={article.title}>
            <p>{article.text}</p>
        </Card>
        <Divider/>
        <BasicForm/>
    </>
    );
};

export default ArticleDetail;
