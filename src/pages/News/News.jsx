import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Spin, Typography } from 'antd';
import styles from './News.module.css';
import axios from 'axios';
const { Meta } = Card;

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllNews();
  }, []);

  const getAllNews = () => {
    axios
      .get('https://rss.app/feeds/v1.1/aUsHcWYIpnLR5yMm.json')
      .then((res) => {
        setNews(res.data.items);
        setLoading(false);
      });
  };

  return (
    <div className={styles.NewsPage}>
      <div style={{ padding: '10px' }}>
        <Typography
          style={{
            fontWeight: 'bolder',
            color: '#2E3856',
            fontSize: '30px',
          }}
        >
          TIN TỨC
        </Typography>
      </div>
      <div style={{ padding: '10px' }}>
        <Spin spinning={loading} delay={500}>
          {news.map((item, index) => {
            return (
              <div key={index}>
                <Card className={styles.News_card} hoverable>
                  <Meta
                    avatar={
                      <Avatar
                        shape="square"
                        size={{ md: 140, lg: 140, xl: 140, xxl: 140 }}
                        src={item.image}
                      />
                    }
                    title={item.title}
                    description={
                      <div>
                        <div>{item.content_text}</div>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button style={{ marginTop: '1rem' }}>
                            Xem Thêm
                          </Button>
                        </a>
                      </div>
                    }
                  />
                </Card>
              </div>
            );
          })}
        </Spin>
      </div>
    </div>
  );
};

export default News;
