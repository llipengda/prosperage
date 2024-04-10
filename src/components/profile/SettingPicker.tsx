import { Picker, View } from '@tarojs/components'

type SettingPickerProps = {
  className?: string
  value: number | string
  range?: string[]
  onChange: (value: number | string) => void
  mode: 'selector' | 'date'
}

const SettingPicker: React.FC<SettingPickerProps> = ({
  className,
  range: _range,
  value,
  onChange,
  mode = 'selector'
}) => {
  const range = _range?.slice(1) || []

  return (
    <View
      className={`border-solid border-b border-[#c6c6c6] flex flex-row items-center justify-between h-[60px] mx-[40px] ${className}`}
    >
      {mode === 'selector' ? (
        <Picker
          className='w-full text-[32px] leading-[40.64px]'
          mode={mode}
          range={range}
          value={Number(value) - 1 < 0 ? 0 : Number(value) - 1}
          onChange={e => onChange(Number(e.detail.value) + 1)}
        >
          {range[Number(value) - 1] || '未设置'}
        </Picker>
      ) : (
        <Picker
          className='w-full text-[32px] leading-[40.64px]'
          mode={mode}
          value={value as string}
          onChange={(e) => onChange(e.detail.value)}
        >
          {value || '未设置'}
        </Picker>
      )}
    </View>
  )
}

export default SettingPicker
