import img1 from '@/assets/images/1.jpg';
import img2 from '@/assets/images/2.jpg';
import img3 from '@/assets/images/3.png';
import img4 from '@/assets/images/4.jpg';
import img5 from '@/assets/images/5.jpg';

export interface ShowcaseItem {
  id: string;
  category: 'research' | 'exchange' | 'activities' | 'campus';
  categoryName: string;
  title: string;
  desc: string;
  image: string;
}

export const showcaseItems: ShowcaseItem[] = [
  {
    id: "1",
    category: "research",
    categoryName: "教学科研",
    title: "数智极客实验室",
    desc: "学院配备顶尖的高算力算力集群，支持大模型微调、深度自然语言处理与分布式计算引擎前沿探索科研实践。实验室也是本硕学子科创项目的孵化摇篮，为深度学习开发提供24小时不间断的澎湃算力支持。",
    image: img1
  },
  {
    id: "2",
    category: "exchange",
    categoryName: "学术交流",
    title: "海峡两岸前沿学术研讨会",
    desc: "定期开展国内外顶级知名学者专题报告会，围绕多模态表示学习、图神经网络及大语言模型可信化应用展开深度探讨，促进大湾区科研成果的高质量学术沟通与智慧交融。",
    image: img2
  },
  {
    id: "3",
    category: "activities",
    categoryName: "第二课堂",
    title: "IT文化节科技创新挑战赛",
    desc: "一年一度的大型科技狂欢盛宴，涵盖算法PK、大模型Hackathon与智慧商业分析沙龙，充分鼓励本研学子在代码编写、系统设计与数智化商业逻辑重塑的舞台上尽情释放创造力。",
    image: img3
  },
  {
    id: "4",
    category: "campus",
    categoryName: "美丽校园",
    title: "晨曦中的逸夫图书馆",
    desc: "绿树掩映中的广财大标志性红墙逸夫图书馆，是万千学子清晨朝圣、探寻真理与自习备考的温馨港湾。图书馆馆藏丰富，配备先进的数据检索终端，为数智学科建设提供坚实文献保障。",
    image: img4
  },
  {
    id: "5",
    category: "research",
    categoryName: "教学科研",
    title: "具身智能与机器人协作实训中心",
    desc: "国家级产学联合育人实训基地，配备多款轮式移动底盘与高精度协作机械臂，专门开展机器人自主避障导航、具身智能多传感器融合感知算法的在轨部署与多Agent协同实操测试。",
    image: img5
  },
  {
    id: "6",
    category: "exchange",
    categoryName: "学术交流",
    title: "粤港澳大湾区数据工程创新论坛",
    desc: "汇聚来自广州、深圳、香港、澳门四地的高校科研骨干、政府数智化转型智囊与大厂云计算资深架构师，深度共商生成式AI时代下企业级多源异构大数据安全计算与可信图谱构建范式。",
    image: img1
  },
  {
    id: "7",
    category: "activities",
    categoryName: "第二课堂",
    title: "“挑战杯”特等奖项目答辩演练",
    desc: "学院高度贯彻“以赛促学、以赛促创”的育人理念。图为我院参赛学子在博学楼多维可视化中心进行《自适应风控大模型系统》项目的路演展示。他们沉着自信，并最终在全国终审决赛中一举勇夺全国特等奖！",
    image: img2
  },
  {
    id: "8",
    category: "campus",
    categoryName: "美丽校园",
    title: "佛山校区学术沙龙绿道",
    desc: "幽静典雅的广财佛山校区绿道，伴随着微风与浓郁的桂花香，与不远处的国际学术交流中心交相辉映，为数智学子在课余时间开展思维碰撞、灵感探讨提供了得天独厚的惬意环境。",
    image: img3
  },
  {
    id: "9",
    category: "research",
    categoryName: "教学科研",
    title: "GPU并行计算异构机房",
    desc: "配备先进的液体冷却多卡并行计算塔，主要支持万亿级参数自然语言大模型、高保真医学三维CT影像超分辨扩散模型的研究，为学院承接的国家自然科学基金与省部级重点课题项目保驾护航。",
    image: img4
  },
  {
    id: "10",
    category: "exchange",
    categoryName: "学术交流",
    title: "卓越讲坛：张建国院士主讲现场",
    desc: "特邀欧洲科学院院士、IEEE Fellow张建国教授莅临广财，做《多模态机器学习在大模型时代的演变逻辑》专题学术报告。全院300余名师生到场，整场交流互动频频、学术氛围极其浓郁。",
    image: img5
  },
  {
    id: "11",
    category: "activities",
    categoryName: "第二课堂",
    title: "全国数学建模大赛获奖表彰会",
    desc: "学院举办数学建模与数据分析科技挑战赛总结表彰大会。本年度我院共有6支队伍斩获国家级一等奖 and 二等奖，充分体现出大数据与人工智能学院学子在统计计算与模型架构层面的卓越功底。",
    image: img1
  },
  {
    id: "12",
    category: "campus",
    categoryName: "美丽校园",
    title: "明德楼大数据与AI学院大楼",
    desc: "大楼不仅涵盖行政、教研多功能区，更内部设有大数据实验中心、生成式AI与虚拟现实联合实验室、广东省数智技术重点实验室等国家及省级科研舞台，展现出极强的学术科技风范。",
    image: img2
  }
];
