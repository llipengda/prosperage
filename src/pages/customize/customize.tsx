import { useCallback, useMemo, useState } from 'react'
import { Image, Text, View } from '@tarojs/components'
import questionMark from '@/assets/question_mark.svg'
import BackButton from '@/components/BackButton'
import Question from '@/components/customize/Question'
import notImplemented from '@/utils/notImplemented'
import sleep from '@/utils/sleep'

const Customize = () => {
  const [showBackground, setShowBackground] = useState(true)
  const [showText, setShowText] = useState(false)

  const handleClickContinue = async () => {
    setShowBackground(false)
    await sleep(200)
    setShowText(true)
  }

  const handleClickQuestionMark = notImplemented

  const questions = useMemo(
    () => [
      {
        title: '问题1',
        text: '你多久玩一次原神？',
        selections: ['每天', '每周', '每月', '从来不']
      },
      {
        title: '问题2',
        text: '你多久玩一次星铁？',
        selections: ['每天', '每周', '每月', '从来不']
      },
      {
        title: '问题3',
        text: '你多久玩一次崩坏3？',
        selections: ['每天', '每周', '每月', '从来不']
      },
      {
        title: '问题4',
        text: '你多久看一次烧鸡？',
        selections: ['每天', '每周', '每月', '从来不']
      }
    ],
    []
  ) // TODO: Get questions from server

  const [selected, setSelected] = useState(
    Array<number>(questions.length).fill(-1)
  )

  const handleSelect = useCallback(
    (questionIndex: number, selectionIndex: number) => {
      setSelected(s => {
        const newSelected = [...s]
        newSelected[questionIndex] = selectionIndex
        return newSelected
      })
    },
    []
  )

  return (
    <View>
      <View
        className={`bg-primary w-screen transition-all delay-200 ease-in-out ${showBackground ? 'h-screen flex flex-col justify-center' : 'h-[436px] fixed top-0 z-10'}`}
        onClick={showBackground ? handleClickContinue : () => {}}
      >
        {showBackground && (
          <View className='mt-[434px]'>
            <View className='text-[64px] leading-[81.28px] text-white font-bold mx-[40px]'>
              <View>开始</View>
              <View>你的养老金产品</View>
              <View>定制之旅</View>
            </View>
            <View className='text-[48px] leading-[60.96px] text-white text-center mt-[434px]'>
              单击继续
            </View>
          </View>
        )}
        {showText && (
          <View>
            <BackButton />
            <Text className='text-white text-[48px] leading-[60.96px] absolute left-[40px] bottom-[30px] font-bold'>
              风险能力评估
            </Text>
            <Image
              className='absolute right-[48px] bottom-[30px] w-[52px] h-[52px]'
              mode='aspectFit'
              src={questionMark}
              onClick={handleClickQuestionMark}
            />
          </View>
        )}
      </View>
      {showText && (
        <View className='px-[40px] w-screen mt-[434px] py-[50px]'>
          {questions.map((question, index) => (
            <Question
              className='mb-[60px]'
              questionId={index}
              key={index}
              title={question.title}
              text={question.text}
              selections={question.selections}
              selected={selected[index]}
              onSelect={handleSelect}
            />
          ))}
        </View>
      )}
    </View>
  )
}

export default Customize
