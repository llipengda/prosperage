import { Image, Input, View } from '@tarojs/components'
import close from '@/assets/close.svg'

interface SettingInputProps {
  className?: string
  value?: string
  placeholder?: string
  onSubmit: (value: string) => void
  onInput: (value: string) => void
  onClear: () => void
}

const SettingInput: React.FC<SettingInputProps> = ({
  className,
  value = '',
  onSubmit,
  placeholder = '',
  onInput,
  onClear
}) => {
  return (
    <View
      className={`border-solid border-b border-[#c6c6c6] flex flex-row items-center justify-between h-[60px] mx-[40px] ${className}`}
    >
      <Input
        className='text-[32px] leading-[40.64px] w-[90%]'
        value={value}
        onInput={e => onInput(e.detail.value)}
        onConfirm={() => onSubmit(value)}
        placeholder={placeholder}
      />
      <View className='w-[38px] h-[38px]' onClick={() => onClear()}>
        <Image src={close} mode='aspectFit' className='w-[38px] h-[38px]' />
      </View>
    </View>
  )
}

export default SettingInput
