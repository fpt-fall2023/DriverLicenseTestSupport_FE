import { useEffect, useState } from 'react';
import ExaminationCss from '../FullScreen.module.css';
import ExamSlide from './ExamSlide';
import { Col, Row } from 'antd';

const rawData = [
  {
    _id: '652b4d834a816de656f99bcc',
    questionName:
      'Khái niệm "Khổ giới hạn của đường bộ" được hiểu như thế nào là đúng?',
    isDanger: false,
    answers: [
      {
        answerName:
          'Là khoảng trống có kích thước giới hạn về chiều cao, chiều rộng của đường, cầu, bến phà, hầm đường bộ để các xe kể cả hàng hóa xếp trên xe đi qua được an toàn.',
        isCorrect: true,
      },
      {
        answerName:
          'Là khoảng trống có kích thước giới hạn về chiều rộng của đường, cầu, bến phà, hầm trên đường bộ để các xe kể cả hàng hóa xếp trên xe đi qua được an toàn.',
        isCorrect: false,
      },
      {
        answerName:
          'Là khoảng trống có kích thước giới hạn về chiều cao của cầu, bến phà, hầm trên đường bộ để các xe đi qua được an toàn.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bcd',
    questionName:
      'Trong các khái niệm dưới đây, "dải phân cách" được hiểu như thế nào là đúng?',
    isDanger: false,
    answers: [
      {
        answerName:
          'Là bộ phận của đường để ngăn cách không cho các loại xe vào những nơi không được phép.',
        isCorrect: false,
      },
      {
        answerName:
          'Là bộ phận của đường để phân tách phần đường xe chạy và hành lang an toàn giao thông.',
        isCorrect: false,
      },
      {
        answerName:
          'Là bộ phận của đường để phân chia mặt đường thành hai chiều xe chạy riêng biệt hoặc để phân chia phần đường của xe cơ giới và xe thô sơ.',
        isCorrect: true,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bce',
    questionName: '"Dải phân cách" trên đường bộ gồm những loại nào?',
    isDanger: false,
    answers: [
      {
        answerName: 'Dải phân cách gồm loại cố định và loại di động.',
        isCorrect: true,
      },
      {
        answerName:
          'Dải phân cách gồm tường chống ồn, hộ lan cứng và hộ lan mềm.',
        isCorrect: false,
      },
      {
        answerName: 'Dải phân cách gồm giá long môn và biển báo hiệu đường bộ.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bcf',
    questionName:
      'Người lái xe được hiểu như thế nào trong các khái niệm dưới đây?',
    isDanger: false,
    answers: [
      {
        answerName: 'Là người điều khiển xe cơ giới.',
        isCorrect: true,
      },
      {
        answerName: 'Là người điều khiển xe thô sơ.',
        isCorrect: false,
      },
      {
        answerName: 'Là người điều khiển xe có súc vật kéo.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bd0',
    questionName:
      'Đường mà trên đó phương tiện tham gia giao thông được các phương tiện giao thông đến từ hướng khác nhường đường khi qua nơi đường giao nhau, được cắm biển báo hiệu đường ưu tiên là loại đường gì?',
    isDanger: false,
    answers: [
      {
        answerName: 'Đường không ưu tiên.',
        isCorrect: false,
      },
      {
        answerName: 'Đường tỉnh lộ.',
        isCorrect: false,
      },
      {
        answerName: 'Đường quốc lộ.',
        isCorrect: false,
      },
      {
        answerName: 'Đường ưu tiên.',
        isCorrect: true,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bca',
    questionName:
      'Phần của đường bộ được sử dụng cho các phương tiện giao thông qua lại là gì?',
    isDanger: false,
    answers: [
      {
        answerName: 'Phần mặt đường và lề đường.',
        isCorrect: false,
      },
      {
        answerName: 'Phần đường xe chạy.',
        isCorrect: true,
      },
      {
        answerName: 'Phần đường xe cơ giới.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bcb',
    questionName: '"Làn đường" là gì?',
    isDanger: false,
    answers: [
      {
        answerName:
          'Là một phần của phần đường xe chạy được chia theo chiều dọc của đường, sử dụng cho xe chạy.',
        isCorrect: false,
      },
      {
        answerName:
          'Là một phần của phần đường xe chạy được chia theo chiều dọc của đường, có bề rộng đủ cho xe chạy an toàn.',
        isCorrect: true,
      },
      {
        answerName: 'Là đường cho xe ô tô chạy, dừng, đỗ an toàn.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bd3',
    questionName:
      '"Phương tiện tham gia giao thông đường bộ" gồm những loại nào?',
    isDanger: false,
    answers: [
      {
        answerName: 'Phương tiện giao thông cơ giới đường bộ.',
        isCorrect: false,
      },
      {
        answerName:
          'Phương tiện giao thông thô sơ đường bộ và xe máy chuyên dùng.',
        isCorrect: false,
      },
      {
        answerName: 'Cả ý 1 và ý 2.',
        isCorrect: true,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bd4',
    questionName:
      '"Người tham gia giao thông đường bộ" gồm những đối tượng nào?',
    isDanger: false,
    answers: [
      {
        answerName:
          'Người điều khiển, người sử dụng phương tiện tham gia giao thông đường bộ.',
        isCorrect: false,
      },
      {
        answerName:
          'Người điều khiển, dẫn dắt súc vật; người đi bộ trên đường bộ.',
        isCorrect: false,
      },
      {
        answerName: 'Cả ý 1 và ý 2.',
        isCorrect: true,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bd5',
    questionName:
      '"Người điều khiển phương tiện tham gia giao thông đường bộ" gồm những đối tượng nào dưới đây?',
    isDanger: false,
    answers: [
      {
        answerName: 'Người điều khiển xe cơ giới, người điều khiển xe thô sơ.',
        isCorrect: false,
      },
      {
        answerName:
          'Người điều khiển xe máy chuyên dùng tham gia giao thông đường bộ.',
        isCorrect: false,
      },
      {
        answerName: 'Cả ý 1 và ý 2.',
        isCorrect: true,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bd6',
    questionName:
      'Khái niệm "người điều khiển giao thông" được hiểu như thế nào là đúng?',
    isDanger: false,
    answers: [
      {
        answerName:
          'Là người điều khiển phương tiện tham gia giao thông tại nơi thi công, nơi ùn tắc giao thông, ở bến phà, tại cầu đường bộ đi chung với đường sắt.',
        isCorrect: false,
      },
      {
        answerName:
          'Là cảnh sát giao thông, người được giao nhiệm vụ hướng dẫn giao thông tại nơi thi công, nơi ùn tắc giao thông, ở bến phà, tại cầu đường bộ đi chung với đường sắt.',
        isCorrect: true,
      },
      {
        answerName:
          'Là người tham gia giao thông tại nơi thi công, nơi ùn tắc giao thông, ở bến phà, tại cầu đường bộ đi chung với đường sắt.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bd7',
    questionName:
      'Trong các khái niệm dưới đây, khái niệm "dừng xe" được hiểu như thế nào là đúng?',
    isDanger: false,
    answers: [
      {
        answerName:
          'Là trạng thái đứng yên của phương tiện giao thông không giới hạn thời gian để cho người lên, xuống phương tiện; xếp dỡ hàng hóa hoặc thực hiện công việc khác.',
        isCorrect: false,
      },
      {
        answerName:
          'Là trạng thái đứng yên tạm thời của phương tiện giao thông trong một khoảng thời gian cần thiết đủ để cho người lên, xuống phương tiện; xếp dỡ hàng hóa hoặc thực hiện công việc khác.',
        isCorrect: true,
      },
      {
        answerName:
          'Là trạng thái đứng yên của phương tiện giao thông không giới hạn thời gian giữa 02 lần vận chuyển hàng hóa hoặc hành khách.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bd8',
    questionName: 'Khái niệm "đỗ xe" được hiểu như thế nào là đúng?',
    isDanger: false,
    answers: [
      {
        answerName:
          'Là trạng thái đứng yên của phương tiện giao thông có giới hạn trong một khoảng thời gian cần thiết đủ để cho người lên, xuống phương tiện đó; xếp dỡ hàng hóa hoặc thực hiện công việc khác.',
        isCorrect: false,
      },
      {
        answerName:
          'Là trạng thái đứng yên của phương tiện giao thông không giới hạn thời gian.',
        isCorrect: true,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bd9',
    questionName: 'Khái niệm "đường cao tốc" được hiểu như thế nào là đúng?',
    isDanger: false,
    answers: [
      {
        answerName:
          'Đường dành riêng cho xe ô tô và một số loại xe chuyên dùng được phép đi vào theo quy định của Luật Giao thông đường bộ.',
        isCorrect: false,
      },
      {
        answerName:
          'Có dải phân cách phân chia đường cho xe chạy hai chiều riêng biệt mà dải phân cách này xe không được đi lên trên; không giao nhau cùng mức với một hoặc một số đường khác.',
        isCorrect: false,
      },
      {
        answerName:
          'Được bố trí đầy đủ trang thiết bị phục vụ, bảo đảm giao thông liên tục, an toàn, rút ngắn thời gian hành trình và chỉ cho xe ra, vào ở những điểm nhất định.',
        isCorrect: false,
      },
      {
        answerName: 'Tất cả các ý trên.',
        isCorrect: true,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bda',
    questionName: 'Hành vi nào dưới đây bị nghiêm cấm?',
    isDanger: false,
    answers: [
      {
        answerName: 'Đỗ xe trên đường phố.',
        isCorrect: false,
      },
      {
        answerName: 'Sử dụng xe đạp đi trên các tuyến quốc lộ có tốc độ cao.',
        isCorrect: false,
      },
      {
        answerName: 'Làm hỏng (cố ý) cọc tiêu, gương cầu, dải phân cách.',
        isCorrect: true,
      },
      {
        answerName: 'Sử dụng còi và quay đầu xe trong khu dân cư.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bdb',
    questionName:
      'Hành vi đưa xe cơ giới, xe máy chuyên dùng không bảo đảm tiêu chuẩn an toàn kỹ thuật và bảo vệ môi trường vào tham gia giao thông đường bộ có bị nghiêm cấm hay không?',
    isDanger: false,
    answers: [
      {
        answerName: 'Không nghiêm cấm.',
        isCorrect: false,
      },
      {
        answerName: 'Bị nghiêm cấm.',
        isCorrect: true,
      },
      {
        answerName: 'Bị nghiêm cấm tùy theo các tuyến đường.',
        isCorrect: false,
      },
      {
        answerName: 'Bị nghiêm cấm tùy theo loại xe.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bdc',
    questionName: 'Cuộc đua xe chỉ được thực hiện khi nào?',
    isDanger: false,
    answers: [
      {
        answerName: 'Diễn ra trên đường phố không có người qua lại.',
        isCorrect: false,
      },
      {
        answerName: 'Được người dân ủng hộ.',
        isCorrect: false,
      },
      {
        answerName: 'Được cơ quan có thẩm quyền cấp phép.',
        isCorrect: true,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bdd',
    questionName:
      'Người điều khiển phương tiện giao thông đường bộ mà trong cơ thể có chất ma túy có bị nghiêm cấm hay không?',
    isDanger: false,
    answers: [
      {
        answerName: 'Bị nghiêm cấm.',
        isCorrect: true,
      },
      {
        answerName: 'Không bị nghiêm cấm.',
        isCorrect: false,
      },
      {
        answerName:
          'Không bị nghiêm cấm, nếu có chất ma túy ở mức nhẹ, có thể điều khiển phương tiện tham gia giao thông.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bde',
    questionName:
      'Việc lái xe mô tô, ô tô, máy kéo ngay sau khi uống rượu, bia có được phép hay không?',
    isDanger: false,
    answers: [
      {
        answerName: 'Không được phép.',
        isCorrect: true,
      },
      {
        answerName: 'Chỉ được lái ở tốc độ chậm và quãng đường ngắn.',
        isCorrect: false,
      },
      {
        answerName: 'Chỉ được lái nếu trong cơ thể có nồng độ cồn thấp.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bdf',
    questionName:
      'Người điều khiển xe mô tô, ô tô, máy kéo trên đường mà trong máu hoặc hơi thở có nồng độ cồn có bị nghiêm cấm không?',
    isDanger: false,
    answers: [
      {
        answerName: 'Bị nghiêm cấm.',
        isCorrect: true,
      },
      {
        answerName: 'Không bị nghiêm cấm.',
        isCorrect: false,
      },
      {
        answerName:
          'Không bị nghiêm cấm, nếu nồng độ cồn trong máu ở mức nhẹ, có thể điều khiển phương tiện tham gia giao thông.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bd1',
    questionName:
      'Khái niệm "phương tiện giao thông cơ giới đường bộ" được hiểu thế nào là đúng?',
    isDanger: false,
    answers: [
      {
        answerName:
          'Gồm xe ô tô; máy kéo; xe mô tô hai bánh; xe mô tô ba bánh; xe gắn máy; xe cơ giới dùng cho người khuyết tật và xe máy chuyên dùng.',
        isCorrect: false,
      },
      {
        answerName:
          'Gồm xe ô tô; máy kéo; rơ moóc hoặc sơ mi rơ moóc được kéo bởi xe ô tô, máy kéo; xe mô tô hai bánh; xe mô tô ba bánh, xe gắn máy (kể cả xe máy điện) và các loại xe tương tự.',
        isCorrect: true,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99be1',
    questionName:
      'Theo Luật phòng chống tác hại của rượu, bia đối tượng nào dưới đây bị cấm sử dụng rượu, bia khi tham gia giao thông?',
    isDanger: false,
    answers: [
      {
        answerName: 'Người điều khiển: xe ô tô, me mô tô, xe đạp, xe gắn máy.',
        isCorrect: true,
      },
      {
        answerName: 'Người ngồi phía sau người điều khiển xe cơ giới.',
        isCorrect: false,
      },
      {
        answerName: 'Người đi bộ.',
        isCorrect: false,
      },
      {
        answerName: 'Cả ý 1 và ý 2.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99be2',
    questionName:
      'Hành vi giao xe cơ giới, xe máy chuyên dùng cho người không đủ điều kiện để điều khiển xe tham gia giao thông có được phép hay không?',
    isDanger: false,
    answers: [
      {
        answerName: 'Chỉ được thực hiện nếu đã hướng dẫn đầy đủ.',
        isCorrect: false,
      },
      {
        answerName: 'Không được phép.',
        isCorrect: true,
      },
      {
        answerName: 'Được phép tùy từng trường hợp.',
        isCorrect: false,
      },
      {
        answerName: 'Chỉ được phép thực hiện với thành viên trong gia đình.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bd2',
    questionName:
      'Khái niệm "phương tiện giao thông thô sơ đường bộ" được hiểu thế nào là đúng?',
    isDanger: false,
    answers: [
      {
        answerName:
          'Gồm xe đạp (kể cả xe đạp máy, xe đạp điện), xe xích lô, xe lăn dùng cho người khuyết tật, xe súc vật kéo và các loại xe tương tự.',
        isCorrect: true,
      },
      {
        answerName:
          'Gồm xe đạp (kể cả xe đạp máy, xe đạp điện), xe gắn máy, xe cơ giới dùng cho người khuyết tật và xe máy chuyên dùng.',
        isCorrect: false,
      },
      {
        answerName:
          'Gồm xe ô tô, máy kéo, rơ moóc hoặc sơ mi rơ moóc được kéo bởi xe ô tô, máy kéo.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99be4',
    questionName:
      'Khi lái xe trên đường, người lái xe cần quan sát và đảm bảo tốc độ phương tiện như thế nào?',
    isDanger: false,
    answers: [
      {
        answerName: 'Chỉ lớn hơn tốc độ tối đa cho phép khi đường vắng.',
        isCorrect: false,
      },
      {
        answerName: 'Chỉ lớn hơn tốc độ tối đa cho phép vào ban đêm.',
        isCorrect: false,
      },
      {
        answerName: 'Không vượt quá tốc độ cho phép.',
        isCorrect: true,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99be5',
    questionName:
      'Phương tiện giao thông đường bộ di chuyển với tốc độ thấp hơn phải đi như thế nào?',
    isDanger: false,
    answers: [
      {
        answerName: 'Đi về phía bên trái.',
        isCorrect: false,
      },
      {
        answerName: 'Đi về phía bên phải.',
        isCorrect: true,
      },
      {
        answerName: 'Đi ở giữa.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99be6',
    questionName:
      'Trên đường có nhiều làn đường, khi điều khiển phương tiện ở tốc độ chậm bạn phải đi ở làn đường nào?',
    isDanger: false,
    answers: [
      {
        answerName: 'Đi ở làn bên phải trong cùng.',
        isCorrect: true,
      },
      {
        answerName: 'Đi ở làn phía bên trái.',
        isCorrect: false,
      },
      {
        answerName: 'Đi ở làn giữa.',
        isCorrect: false,
      },
      {
        answerName:
          'Đi ở bất cứ làn nào nhưng phải bấm đèn cảnh báo nguy hiểm để báo hiệu cho các phương tiện khác.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99be7',
    questionName:
      'Hành vi vượt xe tại các vị trí có tầm nhìn hạn chế, đường vòng, đầu dốc có bị nghiêm cấm hay không?',
    isDanger: false,
    answers: [
      {
        answerName: 'Không bị nghiêm cấm.',
        isCorrect: false,
      },
      {
        answerName: 'Không bị nghiêm cấm khi rất vội.',
        isCorrect: false,
      },
      {
        answerName: 'Bị nghiêm cấm.',
        isCorrect: true,
      },
      {
        answerName: 'Không bị nghiêm cấm khi khẩn cấp.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99be8',
    questionName:
      'Khi lái xe trong khu đô thị và đông dân cư trừ các khu vực có biển cấm sử dụng còi, người lái xe được sử dụng còi như thế nào trong các trường hợp dưới đây?',
    isDanger: false,
    answers: [
      {
        answerName: 'Từ 22 giờ đêm đến 5 giờ sáng.',
        isCorrect: false,
      },
      {
        answerName: 'Từ 5 giờ sáng đến 22 giờ tối.',
        isCorrect: true,
      },
      {
        answerName: 'Từ 23 giờ đêm đến 5 giờ sáng hôm sau.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99be9',
    questionName:
      'Người lái xe sử dụng đèn như thế nào khi lái xe trong khu đô thị và đông dân cư vào ban đêm?',
    isDanger: false,
    answers: [
      {
        answerName: 'Bất cứ đèn nào miễn là mắt nhìn rõ phía trước.',
        isCorrect: false,
      },
      {
        answerName: 'Chỉ bật đèn chiếu xa (đèn pha) khi không nhìn rõ đường.',
        isCorrect: false,
      },
      {
        answerName:
          'Đèn chiếu xa (đèn pha) khi đường vắng, đèn pha chiếu gần (đèn cốt) khi có xe đi ngược chiều.',
        isCorrect: false,
      },
      {
        answerName: 'Đèn chiếu gần (đèn cốt).',
        isCorrect: true,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bea',
    questionName:
      'Hành vi lắp đặt, sử dụng còi, đèn không đúng thiết kế của nhà sản xuất đối với từng loại xe cơ giới có được phép hay không?',
    isDanger: false,
    answers: [
      {
        answerName: 'Được phép.',
        isCorrect: false,
      },
      {
        answerName: 'Không được phép.',
        isCorrect: true,
      },
      {
        answerName: 'Được phép tùy từng trường hợp.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99beb',
    questionName:
      'Trong trường hợp đặc biệt, để được lắp đặt, sử dụng còi, đèn không đúng với thiết kế của nhà sản xuất đối với từng loại xe cơ giới bạn phải đảm bảo yêu cầu nào dưới đây?',
    isDanger: false,
    answers: [
      {
        answerName: 'Phải đảm bảo phụ tùng do đúng nhà sản xuất đó cung cấp.',
        isCorrect: false,
      },
      {
        answerName: 'Phải được chấp thuận của cơ quan có thẩm quyền.',
        isCorrect: true,
      },
      {
        answerName:
          'Phải là xe đăng ký và hoạt động tại các khu vực có địa hình phức tạp.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bec',
    questionName:
      'Việc sản xuất, mua bán, sử dụng biển số xe cơ giới, xe máy chuyên dùng được quy định như thế nào trong Luật Giao thông đường bộ?',
    isDanger: false,
    answers: [
      {
        answerName: 'Được phép sản xuất, sử dụng khi bị mất biển số.',
        isCorrect: false,
      },
      {
        answerName: 'Được phép mua bán, sử dụng khi bị mất biển số.',
        isCorrect: false,
      },
      {
        answerName: 'Nghiêm cấm sản xuất, mua bán, sử dụng trái phép.',
        isCorrect: true,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bed',
    questionName:
      'Người lái xe không được vượt xe khác khi gặp trường hợp nào ghi ở dưới đây?',
    isDanger: false,
    answers: [
      {
        answerName:
          'Trên cầu hẹp có một làn xe. Nơi đường giao nhau, đường bộ giao nhau cùng mức với đường sắt; xe được quyền ưu tiên đang phát tín hiệu ưu tiên đi làm nhiệm vụ.',
        isCorrect: true,
      },
      {
        answerName:
          'Trên cầu có từ 02 làn xe trở lên; nơi đường bộ giao nhau không cùng mức với đường sắt; xe được quyền ưu tiên đang đi phía trước nhưng không phát tín hiệu ưu tiên.',
        isCorrect: false,
      },
      {
        answerName:
          'Trên đường có 2 làn đường được phân chia làn bằng vạch kẻ nét đứt.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bee',
    questionName:
      'Ở phần đường dành cho người đi bộ qua đường, trên cầu, đầu cầu, đường cao tốc, đường hẹp, đường dốc, tại nơi đường bộ giao nhau cùng mức với đường sắt có được quay đầu xe hay không?',
    isDanger: false,
    answers: [
      {
        answerName: 'Được phép.',
        isCorrect: false,
      },
      {
        answerName: 'Không được phép.',
        isCorrect: true,
      },
      {
        answerName: 'Tùy từng trường hợp.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bef',
    questionName:
      'Bạn đang lái xe, phía trước có một xe cảnh sát giao thông không phát tín hiệu ưu tiên bạn có được phép vượt hay không?',
    isDanger: false,
    answers: [
      {
        answerName: 'Không được vượt.',
        isCorrect: false,
      },
      {
        answerName: 'Được vượt khi đang đi trên cầu.',
        isCorrect: false,
      },
      {
        answerName:
          'Được phép vượt khi đi qua nơi giao nhau có ít phương tiện cùng tham gia giao thông.',
        isCorrect: false,
      },
      {
        answerName: 'Được vượt khi đảm bảo an toàn.',
        isCorrect: true,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bf0',
    questionName:
      'Bạn đang lái xe, phía trước có một xe cứu thương đang phát tín hiệu ưu tiên bạn có được phép vượt hay không?',
    isDanger: false,
    answers: [
      {
        answerName: 'Không được vượt.',
        isCorrect: true,
      },
      {
        answerName: 'Được vượt khi đang đi trên cầu.',
        isCorrect: false,
      },
      {
        answerName:
          'Được phép vượt khi đi qua nơi giao nhau có ít phương tiện cùng tham gia giao thông.',
        isCorrect: false,
      },
      {
        answerName: 'Được vượt khi đảm bảo an toàn.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bf2',
    questionName:
      'Bạn đang lái xe trong khu dân cư, có đông xe qua lại, nếu muốn quay đầu bạn cần làm gì để tránh ùn tắc và đảm bảo an toàn giao thông?',
    isDanger: false,
    answers: [
      {
        answerName:
          'Đi tiếp đến điểm giao cắt gần nhất hoặc nơi có biển báo cho phép quay đầu xe.',
        isCorrect: true,
      },
      {
        answerName: 'Bấm đèn khẩn cấp và quay đầu xe từ từ bảo đảm an toàn.',
        isCorrect: false,
      },
      {
        answerName: 'Bấm còi liên tục khi quay đầu để cảnh báo các xe khác.',
        isCorrect: false,
      },
      {
        answerName:
          'Nhờ một người ra hiệu giao thông trên đường chậm lại trước khi quay đầu.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bf1',
    questionName:
      'Người lái xe không được quay đầu xe trong các trường hợp nào dưới đây?',
    isDanger: false,
    answers: [
      {
        answerName:
          'Ở phần đường dành cho người đi bộ qua đường, trên cầu, đầu cầu, đường cao tốc, đường hẹp, đường dốc, tại nơi đường bộ giao nhau cùng mức với đường sắt.',
        isCorrect: true,
      },
      {
        answerName:
          'Ở phía trước hoặc phía sau của phần đường dành cho người đi bộ qua đường, trên đường quốc lộ, tại nơi đường bộ giao nhau không cùng mức với đường sắt.',
        isCorrect: false,
      },
      {
        answerName: 'Cả ý 1 và ý 2.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bf3',
    questionName:
      'Người lái xe không được lùi xe ở những khu vực nào dưới đây?',
    isDanger: false,
    answers: [
      {
        answerName: 'Ở khu vực cho phép đỗ xe.',
        isCorrect: false,
      },
      {
        answerName:
          'Ở khu vực cấm dừng và trên phần đường dành cho người đi bộ qua đường.',
        isCorrect: false,
      },
      {
        answerName:
          'Nơi đường bộ giao nhau, đường bộ giao nhau cùng mức với đường sắt, nơi tầm nhìn bị che khuất, trong hầm đường bộ, đường cao tốc.',
        isCorrect: false,
      },
      {
        answerName: 'Cả ý 2 và ý 3.',
        isCorrect: true,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bf4',
    questionName:
      'Người điều khiển phương tiện giao thông trên đường phố có được dừng xe, đỗ xe trên miệng cống thoát nước, miệng hầm của đường điện thoại, điện cao thế, chỗ dành riêng cho xe chữa cháy lấy nước hay không?',
    isDanger: false,
    answers: [
      {
        answerName: 'Được dừng xe, đỗ xe trong trường hợp cần thiết.',
        isCorrect: false,
      },
      {
        answerName: 'Không được dừng xe, đỗ xe.',
        isCorrect: true,
      },
      {
        answerName: 'Được dừng xe, không được đỗ xe.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bf5',
    questionName:
      'Khi xe đã kéo 1 xe hoặc xe đã kéo 1 rơ moóc, bạn có được phép kéo thêm xe (kể cả xe thô sơ) hoặc rơ moóc thứ hai hay không?',
    isDanger: false,
    answers: [
      {
        answerName:
          'Chỉ được thực hiện trên đường quốc lộ có hai làn xe một chiều.',
        isCorrect: false,
      },
      {
        answerName: 'Chỉ được thực hiện trên đường cao tốc.',
        isCorrect: false,
      },
      {
        answerName: 'Không được thực hiện vào ban ngày.',
        isCorrect: false,
      },
      {
        answerName: 'Không được phép.',
        isCorrect: true,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bf6',
    questionName:
      'Người điều khiển xe mô tô hai bánh, ba bánh, xe gắn máy có được phép sử dụng xe để kéo hoặc đẩy các phương tiện khác khi tham gia giao thông không?',
    isDanger: false,
    answers: [
      {
        answerName: 'Được phép.',
        isCorrect: false,
      },
      {
        answerName:
          'Nếu phương tiện được kéo, đẩy có khối lượng nhỏ hơn phương tiện của mình.',
        isCorrect: false,
      },
      {
        answerName: 'Tùy trường hợp.',
        isCorrect: false,
      },
      {
        answerName: 'Không được phép.',
        isCorrect: true,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bf7',
    questionName:
      'Khi điều khiển xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy, những hành vi buông cả hai tay; sử dụng xe để kéo, đẩy xe khác, vật khác; sử dụng chân chống của xe quệt xuống đường khi xe đang chạy có được phép hay không?',
    isDanger: false,
    answers: [
      {
        answerName: 'Được phép.',
        isCorrect: false,
      },
      {
        answerName: 'Tùy trường hợp.',
        isCorrect: false,
      },
      {
        answerName: 'Không được phép.',
        isCorrect: true,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bf8',
    questionName:
      'Khi điều khiển xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy, những hành vi nào không được phép?',
    isDanger: false,
    answers: [
      {
        answerName:
          'Buông cả hai tay; sử dụng xe để kéo, đẩy xe khác, vật khác; sử dụng chân chống của xe để quệt xuống đường khi xe đang chạy.',
        isCorrect: true,
      },
      {
        answerName:
          'Buông một tay; sử dụng xe để chở người hoặc hàng hóa; để chân chạm xuống đất khi khởi hành.',
        isCorrect: false,
      },
      {
        answerName:
          'Đội mũ bảo hiểm; chạy xe đúng tốc độ quy định và chấp hành đúng quy tắc giao thông đường bộ.',
        isCorrect: false,
      },
      {
        answerName: 'Chở người ngồi sau dưới 16 tuổi.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bf9',
    questionName:
      'Người ngồi trên xe mô tô hai bánh, ba bánh, xe gắn máy khi tham gia giao thông có được mang, vác vật cồng kềnh hay không?',
    isDanger: false,
    answers: [
      {
        answerName: 'Được mang, vác tùy trường hợp cụ thể.',
        isCorrect: false,
      },
      {
        answerName: 'Không được mang, vác.',
        isCorrect: true,
      },
      {
        answerName: 'Được mang, vác nhưng phải đảm bảo an toàn.',
        isCorrect: false,
      },
      {
        answerName: 'Được mang, vác tùy theo sức khoẻ của bản thân.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99be0',
    questionName:
      'Sử dụng rượu, bia khi lái xe, nếu bị phát hiện thì bị xử lý như thế nào?',
    isDanger: false,
    answers: [
      {
        answerName: 'Chỉ bị nhắc nhở.',
        isCorrect: false,
      },
      {
        answerName:
          'Bị xử phạt hành chính hoặc có thể bị xử lý hình sự tùy theo mức độ vi phạm.',
        isCorrect: true,
      },
      {
        answerName: 'Không bị xử lý hình sự.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bfa',
    questionName:
      'Người ngồi trên xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy khi tham gia giao thông có được bám, kéo hoặc đẩy các phương tiện khác không?',
    isDanger: false,
    answers: [
      {
        answerName: 'Được phép.',
        isCorrect: false,
      },
      {
        answerName: 'Được bám trong trường hợp phương tiện của mình bị hỏng.',
        isCorrect: false,
      },
      {
        answerName: 'Được kéo, đẩy trong trường hợp phương tiện khác bị hỏng.',
        isCorrect: false,
      },
      {
        answerName: 'Không được phép.',
        isCorrect: true,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bfc',
    questionName:
      'Khi đang lên dốc người ngồi trên xe mô tô có được kéo theo người đang điều khiển xe đạp hay không?',
    isDanger: false,
    answers: [
      {
        answerName: 'Chỉ được phép nếu cả hai đội mũ bảo hiểm.',
        isCorrect: false,
      },
      {
        answerName: 'Không được phép.',
        isCorrect: true,
      },
      {
        answerName: 'Chỉ được thực hiện trên đường thật vắng.',
        isCorrect: false,
      },
      {
        answerName: 'Chỉ được phép khi người đi xe đạp đã quá mệt.',
        isCorrect: false,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99bfd',
    questionName:
      'Hành vi sử dụng xe mô tô để kéo, đẩy xe mô tô khác bị hết xăng đến trạm mua xăng có được phép hay không?',
    isDanger: false,
    answers: [
      {
        answerName: 'Chỉ được kéo nếu đã nhìn thấy trạm xăng.',
        isCorrect: false,
      },
      {
        answerName:
          'Chỉ được thực hiện trên đường vắng phương tiện cùng tham gia giao thông.',
        isCorrect: false,
      },
      {
        answerName: 'Không được phép.',
        isCorrect: true,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
  {
    _id: '652b4d834a816de656f99be3',
    questionName:
      'Hành vi điều khiển xe cơ giới chạy quá tốc độ quy định, giành đường, vượt ẩu có bị nghiêm cấm hay không?',
    isDanger: false,
    answers: [
      {
        answerName: 'Bị nghiêm cấm tùy từng trường hợp.',
        isCorrect: false,
      },
      {
        answerName: 'Không bị nghiêm cấm.',
        isCorrect: false,
      },
      {
        answerName: 'Bị nghiêm cấm.',
        isCorrect: true,
      },
    ],
    category: {
      _id: '65236e4b232393147808b9e8',
      questionType: 'khái niệm',
    },
  },
];

const Examination = () => {
  const initialTime = 20 * 60; // 20 minutes in seconds
  const [time, setTime] = useState(initialTime);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const scrollToItem = (targetId) => {
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };
  const [selectedAnswers, setSelectedAnswers] = useState(
    new Array(rawData.length).fill(null),
  );
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerClick = (questionIndex, selectedAns) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = selectedAns;
    setSelectedAnswers(updatedAnswers);
  };

  const handleSubmitExam = () => {
    let rightAns = 0;
    for (let i = 0; i < rawData.length; i++) {
      if (selectedAnswers[i] != null && selectedAnswers[i].isCorrect == true) {
        rightAns++;
      }
    }
    // let calScore = rightAns / rawData.length * 10;
    // const result = {
    //   correctAns: rightAns,
    //   score: calScore
    // }
    setScore(rightAns);
    setShowScore(true);
    return rightAns;
  };

  useEffect(() => {
    if (time <= 0) {
      // Timer is up, you can add your logic here
      const rightAns = handleSubmitExam();
      alert(`
      Đã hết giờ làm bài! \n
      Đáp án đúng của bạn là: ${rightAns}/${rawData.length}
      `);
    } else {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [time]);

  return (
    <div className={ExaminationCss.examinationMode}>
      <div className={ExaminationCss.referenceQues}>
        <div className={ExaminationCss.stickyRefQues}>
          <div>
            <div>Thời gian làm bài:</div>
            <div>
              {minutes}:{seconds}
            </div>
          </div>
          <ul className={ExaminationCss.stickyRefList}>
            {rawData.map((ques, index) => {
              return (
                <li
                  key={index}
                  onClick={() => scrollToItem(`refTo_${index}`)}
                  className={ExaminationCss.stickyRefItem}
                >
                  {index + 1}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Row justify="center">
        <Col span={18}>
          <div>
            point hereee{' '}
            {showScore ? (
              <p>
                {score}/{rawData.length}
              </p>
            ) : (
              ''
            )}
          </div>
          {rawData.map((question, index) => {
            return (
              <ExamSlide
                key={index}
                question={question}
                questionIndex={index}
                examLength={rawData.length}
                handleAnsClick={handleAnswerClick}
              />
            );
          })}
          <button onClick={handleSubmitExam}>Submit exam</button>
        </Col>
      </Row>
    </div>
  );
};

export default Examination;
