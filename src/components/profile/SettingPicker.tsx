import { Picker, View } from '@tarojs/components'

interface SettingPickerProps {
  className?: string
  value: number
  range: string[]
  onChange: (value: number) => void
}

const SettingPicker: React.FC<SettingPickerProps> = ({
  className,
  range: _range,
  value,
  onChange
}) => {
  const range = _range.slice(1)

  return (
    <View
      className={`border-solid border-b border-[#c6c6c6] flex flex-row items-center justify-between h-[60px] mx-[40px] ${className}`}
    >
      <Picker
        className='w-full text-[32px] leading-[40.64px]'
        mode='selector'
        range={range}
        value={value - 1 < 0 ? 0 : value - 1}
        onChange={e => onChange(Number(e.detail.value) + 1)}
      >
        {range[value - 1] || '未设置'}
      </Picker>
    </View>
  )
}

export default SettingPicker
