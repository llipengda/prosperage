import { Text, View } from '@tarojs/components'

type TextButton = {
  className?: string
  text: string
  onClick: () => void
}

const TextButton: React.FC<TextButton> = ({ className, text, onClick }) => (
  <View
    className={`w-[332px] h-[78px] text-[32px] leading-[40.64px] bg-primary text-white cursor-pointer flex justify-center items-center rounded-[200px] ${className}`}
    onClick={onClick}
  >
    <Text>{text}</Text>
  </View>
)

export default TextButton
