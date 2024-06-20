import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Article from '../components/Article';
import BasicForm from '../components/Form';

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0); // Utilizaremos este estado para forzar el refresco de la lista

    useEffect(() => {
        fetchArticles();
    }, [refreshKey]); // Agrega refreshKey como dependencia para volver a ejecutar fetchArticles

    const fetchArticles = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/server/articles');
            setArticles(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleNewArticle = (newArticle) => {
        // Agrega el nuevo artículo a la lista local
        setArticles(prevArticles => [...prevArticles, newArticle]);

        // Incrementa el refreshKey para forzar el refresco de la lista de artículos
        setRefreshKey(prevKey => prevKey + 1);

        // Realiza una nueva llamada a la API para obtener la lista actualizada de artículos
        fetchArticles();
    };

    return (
        <>
            <Article data={articles} />
            <h2>Post new article</h2>
            <BasicForm requestMethod='post' onFormSubmit={handleNewArticle} btnText='Post'/>
        </>
    );
};

export default ArticleList;
