import { View } from '@tarojs/components'
import educationInvestment from '@/assets/icons/education_investment.svg'
import industryNews from '@/assets/icons/industry_news.svg'
import planningGuide from '@/assets/icons/planning_guide.svg'
import researchReport from '@/assets/icons/research_report.svg'
import Search from '@/components/Search'
import Article from '@/components/index/Article'
import IconButton from '@/components/index/IconButton'
import Title from '@/components/index/Title'
import notImplemented from '@/utils/notImplemented'

export default function Policy() {
  const handleClickPlanningGuide = notImplemented
  const handleClickEducationInvestment = notImplemented
  const handleClickIndustryNews = notImplemented
  const handleClickResearchReport = notImplemented

  const articles = [
    {
      image: 'https://api.crazyforlove.fun/static/1.jpg',
      title: '中国养老金融发展报告',
      content:
        '新海南客户端、南海网2月7日消息（记者 谭琦）2月6日，海南省169.4万名离退休人员和城乡老人2024年2月的养老金者年老或丧失劳动'
    },
    {
      image: 'https://api.crazyforlove.fun/static/1.jpg',
      title: '中国养老金融发展报告',
      content:
        '新海南客户端、南海网2月7日消息（记者 谭琦）2月6日，海南省169.4万名离退休人员和城乡老人2024年2月的养老金者年老或丧失劳动'
    },
    {
      image: 'https://api.crazyforlove.fun/static/1.jpg',
      title: '中国养老金融发展报告',
      content:
        '新海南客户端、南海网2月7日消息（记者 谭琦）2月6日，海南省169.4万名离退休人员和城乡老人2024年2月的养老金者年老或丧失劳动'
    },
    {
      image: 'https://api.crazyforlove.fun/static/1.jpg',
      title: '中国养老金融发展报告',
      content:
        '新海南客户端、南海网2月7日消息（记者 谭琦）2月6日，海南省169.4万名离退休人员和城乡老人2024年2月的养老金者年老或丧失劳动'
    }
  ]

  const handleClickArticle = notImplemented

  return (
    <View>
      <View className='h-[704px] bg-primary flex flex-col'>
        <View className='text-[64px] text-white leading-[80px] ml-[40px] mt-[402px] w-[55%] font-bold'>
          让每个人的养老更美好！
        </View>
        <Search className='mx-[40px] mt-[20px]' />
      </View>
      <View className='flex flex-col w-screen'>
        <Title className='mt-[56px] mx-[40px]' text='相关咨询' />
        <View className='flex flex-row mx-[40px] mt-[58px] justify-between'>
          <IconButton
            icon={planningGuide}
            text='规划指南'
            onClick={handleClickPlanningGuide}
          />
          <IconButton
            icon={educationInvestment}
            text='投资教育'
            onClick={handleClickEducationInvestment}
          />
          <IconButton
            icon={industryNews}
            text='行业动态'
            onClick={handleClickIndustryNews}
          />
          <IconButton
            icon={researchReport}
            text='研究报告'
            onClick={handleClickResearchReport}
          />
        </View>
        <Title className='mx-[40px] mt-[80px]' text='政策解读' />
        <View className='flex flex-col mt-[58px]'>
          {articles.map((article, index) => (
            <Article
              key={index}
              image={article.image}
              title={article.title}
              content={article.content}
              imageClassName='w-[196px] h-[252px] mt-[14px]'
              className='h-[284px] mb-[24px] mx-[40px]'
              maxLength={65}
              onClick={handleClickArticle}
            />
          ))}
        </View>
      </View>
    </View>
  )
}
