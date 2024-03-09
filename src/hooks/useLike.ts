import { useEffect, useState } from 'react'
import { LikeApi } from '@/api'
import useStopPropagation from '@/hooks/useStopPropagation'

/**
 * @param type 1: post, 2: comment
 */
const useLike = (
  id: string | number,
  liked: boolean,
  originalLikes: number,
  type: 1 | 2
) => {
  const [isLiked, setIsLiked] = useState(liked)
  const [addLike, setAddLike] = useState(0)
  const [isLikeDisabled, setIsLikeDisabled] = useState(false)

  useEffect(() => {
    setIsLiked(liked)
    setAddLike(0)
  }, [liked])

  const handleLike = useStopPropagation(async () => {
    if (isLikeDisabled) {
      return
    }
    setIsLikeDisabled(true)
    setIsLiked(!isLiked)
    setAddLike(liked ? (isLiked ? -1 : 0) : isLiked ? 0 : 1)
    if (isLiked) {
      await LikeApi.unlike({ objId: Number(id), type })
    } else {
      await LikeApi.like({ objId: Number(id), type })
    }
    setIsLikeDisabled(false)
  })

  return {
    isLiked,
    likes: addLike + originalLikes,
    handleLike
  }
}

export default useLike
