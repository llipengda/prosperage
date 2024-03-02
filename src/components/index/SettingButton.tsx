import { Text, View } from '@tarojs/components'

type SettingButtonProps = {
  className?: string
  text: string
  onClick: () => void
}

const SettingButton = ({ className, text, onClick }: SettingButtonProps) => {
  return (
    <View
      className={`w-screen bg-white shadow-[0_4px_24px_0_#00000040] py-[42px] px-[70px] ${className}`}
      onClick={onClick}
    >
      <Text className='text-[32px] leading-[40.64px]'>{text}</Text>
    </View>
  )
}

export default SettingButton
