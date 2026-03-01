import React, { use, useEffect, useState } from "react";
import MainContent from "../../Components/MainContent";
import { useContext } from "react";
import nationContext from "../../Context/nationContext.js";
import { useParams } from "react-router";

function News() {
  const  {topic}  = useParams();
  const {nation} = useContext(nationContext);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategoryNews = async () => {
      setLoading(true);

      try {
        const apiKey = "87ece368216988bfaa343decb23d6941";
        const today = new Date().toISOString().split("T")[0];


        const cacheKey = `news_${topic}_${nation}_${today}`;

        const cached = localStorage.getItem(cacheKey);

        if (cached) {
          const parsed = JSON.parse(cached);

          if (Date.now() < parsed.expiry) {
            setArticles(parsed.data);
            setLoading(false);
            return;
          } else {
            localStorage.removeItem(cacheKey);
          }
        }

        let url = `https://gnews.io/api/v4/top-headlines?lang=en&max=50&apikey=${apiKey}`;

        if (topic) url += `&category=${topic}`;
        if (nation) url += `&country=${nation}`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.articles) {
          setArticles(data.articles);

          const cacheData = {
            data: data.articles,
            expiry: new Date().setHours(23, 59, 59, 999),
          };

          localStorage.setItem(cacheKey, JSON.stringify(cacheData));
        }
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryNews();
  }, [nation, topic]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {loading ? <p className="text-center text-2xl text-gray-800 mb-6">Loading...</p> : <MainContent data={articles} />}
    </div>
  );
}

export default News;