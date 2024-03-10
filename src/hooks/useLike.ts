import { useState } from 'react'
import { LikeApi } from '@/api'
import useStopPropagation from '@/hooks/useStopPropagation'

/**
 * @param type 1: post, 2: comment, 3: reply
 */
const useLike = (
  id: string | number,
  liked: boolean,
  type: 1 | 2 | 3,
  updateLikes: (id: number, isLiked: boolean, delta: number) => void
) => {
  const [isLikeDisabled, setIsLikeDisabled] = useState(false)

  const handleLike = useStopPropagation(async () => {
    if (isLikeDisabled) {
      return
    }
    setIsLikeDisabled(true)
    if (liked) {
      updateLikes(Number(id), false, -1)
      await LikeApi.unlike({ objId: Number(id), type })
    } else {
      updateLikes(Number(id), true, 1)
      await LikeApi.like({ objId: Number(id), type })
    }
    setIsLikeDisabled(false)
  })

  return handleLike
}

export default useLike
