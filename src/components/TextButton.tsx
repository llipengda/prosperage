import { Text, View } from '@tarojs/components'

type TextButton = {
  className?: string
  text: string
  disabled?: boolean
  onClick: () => void
}

const TextButton: React.FC<TextButton> = ({
  className,
  text,
  onClick,
  disabled = false
}) => (
  <View
    className={`w-[332px] h-[78px] text-[32px] leading-[40.64px] ${disabled ? 'bg-[#c6c6c6]' : 'bg-primary'} text-white cursor-pointer flex justify-center items-center rounded-[200px] ${className}`}
    onClick={disabled ? () => {} : onClick}
  >
    <Text>{text}</Text>
  </View>
)

export default TextButton
