import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Typography } from 'antd';
import styles from './News.module.css'
import axios from 'axios';
const { Meta } = Card;

const News = () => {
  const [news, setNews] = useState([])

  useEffect(() => {
    getAllNews()
  }, [])

  const getAllNews = () => {
    axios.get('https://rss.app/feeds/v1.1/Murq3hlGAbT0nKnA.json').then((res) => {
      setNews(res.data.items)
    })
  }

  return (
    <div className={styles.NewsPage}>
      <div style={{ padding: "10px" }} >
        <Typography
          style={{
            fontWeight: "bolder",
            color: "#2E3856",
            fontSize: "30px"
          }}
        >
          TIN TỨC
        </Typography>
      </div>
      <div style={{ padding: "10px" }}>
        {news.map((item) => {
          return (
            <div>
              <Card
                className={styles.News_card}
                hoverable
              >
                <Meta
                  avatar={
                    <Avatar
                      shape='square'
                      size={{ md: 140, lg: 140, xl: 140, xxl: 140 }}
                      src={item.image}
                    />
                  }
                  title={item.title}
                  description={
                    <div>
                      <div>{item.content_text}</div>
                      <a href={item.url} target="_blank">
                        <Button style={{ marginTop: "1rem" }}>Xem Thêm</Button>
                      </a>
                    </div>
                  }
                />
              </Card>
            </div>
          )
        })}
      </div>
    </div>

  )
};

export default News;

