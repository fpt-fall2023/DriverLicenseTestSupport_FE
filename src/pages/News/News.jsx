import React from 'react';
import { Avatar, Card,Typography} from 'antd';
import styles from './News.module.css'
const { Meta } = Card;

const News = () => {
  return (
    <div className={styles.NewsPage}>
      <div style={{padding:"10px"}} >
<Typography
style={{
  fontWeight: "bolder",
  color: "#2E3856",
  fontSize:"30px"
}}
>
  TIN TỨC
</Typography>
      </div>
      <div style={{padding:"10px"}}>
        <Card
          className={styles.News_card}
          hoverable
        >
          <Meta
            avatar={
              <Avatar
                shape='square'
                size={{ md: 140, lg: 140, xl: 140, xxl: 140 }}
                src="https://i1-vnexpress.vnecdn.net/2023/08/29/sat-hach-3893-1693301252.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=DmAcindw6UC8GtLdaF5BaA"
              />
            }
            title="Đề xuất học lý thuyết lái xe trực tuyến, giảm chương trình đào tạo"
            description="Cục Đường bộ Việt Nam đề xuất học viên học lái xe có thể học trực tuyến phần lý thuyết thay vì đến lớp như hiện nay, nội dung đào tạo cũng được tiết giảm."
          />

        </Card>

        <Card
          className={styles.News_card}
          hoverable
        >
          <Meta
            avatar={
              <Avatar
                shape='square'
                size={{ md: 140, lg: 140, xl: 140, xxl: 140 }}
                src="https://i1-vnexpress.vnecdn.net/2023/08/28/q528-1693193271-9247-1693193328.png?w=500&h=300&q=100&dpr=1&fit=crop&s=ghW1ksAK8OeuWhrEseeeNA"
              />
            }
            title="Tại ngã tư, các xe đi thế nào đúng quy tắc giao thông?"
            description="Các xe đến từ bốn phía, trong đó có xe tải đã đi vào giữa ngã tư nơi có CSGT điều hướng, các xe phải đi như thế nào."
          />

        </Card>

        <Card
          className={styles.News_card}
          hoverable
        >
          <Meta
            avatar={
              <Avatar
                shape='square'
                size={{ md: 140, lg: 140, xl: 140, xxl: 140 }}
                src="https://i1-vnexpress.vnecdn.net/2023/08/24/q527-1692846778-2885-1692846808.png?w=500&h=300&q=100&dpr=2&fit=crop&s=xU7vSi6_04fEG4EQjOMXLQ"
              />
            }
            title="Xe con không được phép quay đầu nơi có vạch kẻ liền"
            description="Xe con quay đầu ở nơi có vạch kẻ liền màu vàng ngoài bị phạt tiền còn tước bằng lái xe."
          />

        </Card>

        <Card
          className={styles.News_card}
          hoverable
        >
          <Meta
            avatar={
              <Avatar
                shape='square'
                size={{ md: 140, lg: 140, xl: 140, xxl: 140 }}
                src="https://i1-vnexpress.vnecdn.net/2023/08/22/unnamed-1692688864-8353-1692688884.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=QkAby4nMhpfSXyYIebXsug"
              />
            }
            title="'Dễ-khó khi thi bằng lái ôtô'"
            description="Phần lý thuyết rất hữu ích, chịu khó học và thêm chút mẹo là đỗ, trong khi phần thi mô phỏng lại không thực tế. "
          />

        </Card>

        <Card
          className={styles.News_card}
          hoverable
        >
          <Meta
            avatar={
              <Avatar
                shape='square'
                size={{ md: 140, lg: 140, xl: 140, xxl: 140 }}
                src="https://i1-vnexpress.vnecdn.net/2023/05/22/aotaolaixe-1684746015-8365-1684746142.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=FpLwoadghnQ7C6y-V98Odw"
              />
            }
            title="Điều tra nhận hối lộ trong thi bằng lái xe"
            description="9 người bị khởi tố với cáo buộc đưa nhận hối lộ trong quá trình sát hạch, cấp giấy phép lái xe ôtô."
          />

        </Card>
      </div>
    </div>

  )
};

export default News;