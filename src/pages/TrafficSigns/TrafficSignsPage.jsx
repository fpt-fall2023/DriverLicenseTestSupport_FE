import { useEffect, useState } from 'react';
import { getTrafficSigns } from '../../apis/TrafficSignService';
import { Collapse, Spin } from 'antd';

const TrafficSignsPage = () => {
  const [bien_bao_cam, setBienBaoCam] = useState([]);
  const [bien_bao_hieu_lenh, setBienBaoHieuLenh] = useState([]);
  const [bien_bao_chi_dan, setBienBaoChiDan] = useState([]);
  const [bien_bao_nguy_hiem, setBienBaoNguyHiem] = useState([]);
  const [bien_bao_phu, setBienBaoPhu] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const items = [
    {
      key: '1',
      label: 'Biển báo cấm',
      children: (
        <div>
          {bien_bao_cam.map((item, index) => {
            return (
              <div key={index}>
                <h3>{item.title}</h3>
                <img src={item.image} alt={item.title} />
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      key: '2',
      label: 'Biển báo chỉ dẫn',
      children: (
        <div>
          {bien_bao_chi_dan.map((item, index) => {
            return (
              <div key={index}>
                <h3>{item.title}</h3>
                <img src={item.image} alt={item.title} />
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      key: '3',
      label: 'Biển báo hiệu lệnh',
      children: (
        <div>
          {bien_bao_hieu_lenh.map((item, index) => {
            return (
              <div key={index}>
                <h3>{item.title}</h3>
                <img src={item.image} alt={item.title} />
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      key: '4',
      label: 'Biển báo nguy hiểm',
      children: (
        <div>
          {bien_bao_nguy_hiem.map((item, index) => {
            return (
              <div key={index}>
                <h3>{item.title}</h3>
                <img src={item.image} alt={item.title} />
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      key: '5',
      label: 'Biển báo phụ',
      children: (
        <div>
          {bien_bao_phu.map((item, index) => {
            return (
              <div key={index}>
                <h3>{item.title}</h3>
                <img src={item.image} alt={item.title} />
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      ),
    },
  ];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setIsLoading(true);
    getTrafficSigns()
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
          console.log(res.data.data.TrafficSign);
          res.data.data.TrafficSign.forEach((item) => {
            const index = item.title.search(/(P\.|I\.|R\.E|DP\.|R\.|W\.|S\.)/);
            item.title = item.title.substring(0, index);
          });
          const bien_bao_cam = filterTrafficSigns(
            res.data.data.TrafficSign,
            'Biển báo cấm',
          );
          const bien_bao_hieu_lenh = filterTrafficSigns(
            res.data.data.TrafficSign,
            'Biển báo hiệu lệnh',
          );
          const bien_bao_chi_dan = filterTrafficSigns(
            res.data.data.TrafficSign,
            'Biển báo chỉ dẫn',
          );
          const bien_bao_nguy_hiem = filterTrafficSigns(
            res.data.data.TrafficSign,
            'Biển báo nguy hiểm',
          );
          const bien_bao_phu = filterTrafficSigns(
            res.data.data.TrafficSign,
            'Biển báo phụ',
          );
          setBienBaoCam(bien_bao_cam);
          setBienBaoHieuLenh(bien_bao_hieu_lenh);
          setBienBaoChiDan(bien_bao_chi_dan);
          setBienBaoNguyHiem(bien_bao_nguy_hiem);
          setBienBaoPhu(bien_bao_phu);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filterTrafficSigns = (datas, trafficType) => {
    return datas.filter((item) => {
      return item.trafficCategory.trafficType == trafficType;
    });
  };
  return (
    <div
      style={{
        height: 'max-content',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <Spin spinning={isLoading} tip="Đang lấy dữ liệu">
        <Collapse items={items} defaultActiveKey={['1']} />
      </Spin>
    </div>
  );
};

export default TrafficSignsPage;
