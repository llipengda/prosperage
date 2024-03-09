import { Image, View } from '@tarojs/components'
import rightArrow from '@/assets/arrow_right.svg'
import Search from '@/components/Search'
import Article from '@/components/index/Article'
import Swiper from '@/components/index/Swiper'
import Title from '@/components/Title'
import notImplemented from '@/utils/notImplemented'
import { navigate } from '@/utils/routeTools'

export default function Home() {
  const handleClickCustomize = () => {
    navigate('/pages/customize/customize')
  }

  const articles = [
    {
      image: 'https://api.crazyforlove.fun/static/1.jpg',
      title: '2024养老金补发政策公布',
      content:
        '养老金（pension）也称退休金、退休费，是一种最主要的社会养老保险待遇。'
    },
    {
      image: 'https://api.crazyforlove.fun/static/1.jpg',
      title: '2024养老金补发政策公布',
      content:
        '养老金（pension）也称退休金、退休费，是一种最主要的社会养老保险待遇。'
    },
    {
      image: 'https://api.crazyforlove.fun/static/1.jpg',
      title: '2024养老金补发政策公布',
      content:
        '养老金（pension）也称退休金、退休费，是一种最主要的社会养老保险待遇。'
    },
    {
      image: 'https://api.crazyforlove.fun/static/1.jpg',
      title: '2024养老金补发政策公布',
      content:
        '养老金（pension）也称退休金、退休费，是一种最主要的社会养老保险待遇。'
    }
  ] // TODO: get articles from API

  const handleClickArticle = notImplemented

  return (
    <View>
      <View className='h-[434px] bg-primary flex flex-col'>
        <View className='text-[64px] text-white leading-[80px] ml-[40px] mt-[134px] w-[55%] font-bold'>
          让每个人的养老更美好！
        </View>
        <Search className='mx-[40px] mt-[20px]' />
      </View>
      <View className='flex flex-col w-screen'>
        <Swiper
          className='mt-[34px] mx-[40px]'
          images={[
            'https://api.crazyforlove.fun/static/1.jpg', // TODO: get images from API
            'https://api.crazyforlove.fun/static/1.jpg',
            'https://api.crazyforlove.fun/static/1.jpg',
            'https://api.crazyforlove.fun/static/1.jpg'
          ]}
        />
        <View
          className='relative mx-[40px] mt-[30px] h-[248px] rounded-[30px] bg-gradient-to-b from-primary from-0%'
          onClick={handleClickCustomize}
        >
          <View className='ml-[26px] mt-[18px] w-[306px] text-[48px] leading-[60px] text-white font-bold'>
            定制你的专属养老计划
            <Image
              src={rightArrow}
              className='absolute right-[29.1px] bottom-[25.66px] h-[48.66px] w-[60.84px]'
              mode='aspectFit'
            />
          </View>
        </View>
        <Title className='ml-[40px] mt-[66px]' text='每日新政' />
        <View className='flex flex-col mt-[37px]'>
          {articles.map((article, index) => (
            <Article
              key={index}
              image={article.image}
              title={article.title}
              content={article.content}
              className='mx-[40px] mb-[16px]'
              onClick={handleClickArticle}
            />
          ))}
        </View>
      </View>
    </View>
  )
}
