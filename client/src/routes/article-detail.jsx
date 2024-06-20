import React, { useState, useEffect } from 'react';
import { Button, Card, Divider } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

import Article from '../components/Article';
import BasicForm from '../components/Form';
import Axios from '../queries/axios'

//A
const ArticleDetail = () => {
    const [article, setArticle] = useState({});
    const { articleID } = useParams();
    const [refreshKey, setRefreshKey] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
         fetchArticle();
    }, [refreshKey]);

    const fetchArticle = async () => {
        try {
            const res = await Axios.get(`/articles/${articleID}`);
            setArticle(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    const handleArticleUpdate = () => {

        // Incrementa el refreshKey para forzar el refresco de la lista de artículos
        setRefreshKey(prevKey => prevKey + 1);

        // Realiza una nueva llamada a la API para obtener la lista actualizada de artículos
        fetchArticle();
    };

    const handleDelete = () => {
        Axios.delete(`http://127.0.0.1:8000/server/articles/${articleID}`)
        .then(res => {
            console.log(res);
            navigate('/')
        });
    }

    return (
    <>
        <Card title={article.title}>
            <p>{article.text}</p>
        </Card>
        <Divider/>
        <BasicForm requestMethod='put' articleID={articleID} onFormSubmit={handleArticleUpdate} btnText='Update'/>
        <Button type='primary' danger onClick={handleDelete}>Delete</Button>
    </>
    );
};

export default ArticleDetail;
