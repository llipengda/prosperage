import { ScrollView, View } from '@tarojs/components'
import { DEFAULT_AVATAR } from '@/common/constants'
import BackButton from '@/components/BackButton'
import NavigationBarTitle from '@/components/NavigationBarTitle'
import Title from '@/components/Title'
import Law from '@/components/index/me/rights/Law'
import Policy from '@/components/index/me/rights/Policy'

const Rights = () => {
  return (
    <View>
      <View className='bg-gradient-to-b from-primary from-0% h-[406px] w-screen' />
      <NavigationBarTitle text='消费者权益保护' lower />
      <BackButton lower />
      <View className='px-[40px]'>
        <Title text='金融消费者权益保护' />
        <ScrollView
          className='mt-[60px] mb-[70px] h-[414px] w-full flex flex-nowrap flex-row'
          scrollX
          enableFlex
          scrollWithAnimation
        >
          <Law
            className='mr-[20px] inline-block whitespace-nowrap'
            title='受教育权'
            img={DEFAULT_AVATAR}
          />
          <Law
            className='mr-[20px] inline-block whitespace-nowrap'
            title='受教育权'
            img={DEFAULT_AVATAR}
          />
          <Law
            className='mr-[20px] inline-block whitespace-nowrap'
            title='受教育权'
            img={DEFAULT_AVATAR}
          />
          <Law
            className='mr-[20px] inline-block whitespace-nowrap'
            title='受教育权'
            img={DEFAULT_AVATAR}
          />
        </ScrollView>
        <Title text='相关文件' />
        <View className='mt-[60px]'>
          <Policy
            id={1}
            text='2024养老金补发政策公布'
            number='国办发（2015） 32号'
          />
          <Policy
            id={1}
            text='2024养老金补发政策公布'
            number='国办发（2015） 32号'
          />
          <Policy
            id={1}
            text='2024养老金补发政策公布'
            number='国办发（2015） 32号'
          />
        </View>
      </View>
    </View>
  )
}

export default Rights
