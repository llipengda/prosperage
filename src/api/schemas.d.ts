/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/user/update': {
    /**
     * 用户更新信息
     * @description 用户更新信息
     */
    put: operations['update']
  }
  '/suggestion/add': {
    /**
     * 添加意见反馈
     * @description 添加意见反馈
     */
    post: operations['addSuggestion']
  }
  '/reply/add': {
    /**
     * 添加回复
     * @description 添加回复
     */
    post: operations['addReply']
  }
  '/post/share': {
    /**
     * 分享帖子
     * @description 分享帖子
     */
    post: operations['share']
  }
  '/post/add': {
    /**
     * 添加帖子
     * @description 添加帖子
     */
    post: operations['addPost']
  }
  '/like/undo': {
    /**
     * 取消点赞
     * @description 取消点赞
     */
    post: operations['unlike']
  }
  '/like/do': {
    /**
     * 点赞
     * @description 点赞
     */
    post: operations['like']
  }
  '/image': {
    /**
     * 上传图片
     * @description 上传图片
     */
    post: operations['uploadImage']
  }
  '/comment/share': {
    /**
     * 分享评论
     * @description 分享评论
     */
    post: operations['share_1']
  }
  '/comment/add': {
    /**
     * 评论
     * @description 评论
     */
    post: operations['comment']
  }
  '/apply/handle': {
    /**
     * 处理好友申请
     * @description 处理好友申请
     */
    post: operations['handle']
  }
  '/apply/do': {
    /**
     * 此用户申请添加指定用户为好友
     * @description 此用户申请添加指定用户为好友
     */
    post: operations['apply']
  }
  '/user/login': {
    /**
     * 用户登录
     * @description 用户登录
     */
    get: operations['login']
  }
  '/user/info': {
    /**
     * 获取用户信息
     * @description 获取用户信息
     */
    get: operations['info']
  }
  '/user/id': {
    /**
     * 获取指定id的用户信息
     * @description 获取指定id的用户信息
     */
    get: operations['info_1']
  }
  '/user/check': {
    /**
     * 检查登录态
     * @description 检查登录态
     */
    get: operations['check']
  }
  '/test/502': {
    get: operations['test502']
  }
  '/test/500': {
    get: operations['test500']
  }
  '/test/404': {
    get: operations['test404']
  }
  '/test/403': {
    get: operations['test403']
  }
  '/test/401': {
    get: operations['test401']
  }
  '/test/400': {
    get: operations['test400']
  }
  '/test/200': {
    get: operations['test200']
  }
  '/suggestion/get': {
    /**
     * 获取意见反馈列表
     * @description 获取意见反馈列表
     */
    get: operations['getSuggestions']
  }
  '/search/getUserList': {
    /**
     * 根据关键词搜索用户
     * @description 根据关键词搜索用户
     */
    get: operations['getUserList']
  }
  '/search/getPosts': {
    get: operations['getPosts']
  }
  '/reply/get': {
    /**
     * 获取回复列表
     * @description 获取回复列表
     */
    get: operations['getList']
  }
  '/relation/getFriendList': {
    /**
     * 获取好友列表
     * @description 获取好友列表
     */
    get: operations['getFriendList']
  }
  '/post/get': {
    /**
     * 获取帖子列表
     * @description 获取帖子列表
     */
    get: operations['getList_1']
  }
  '/post/getFriendsPost': {
    /**
     * 获取好友的帖子列表
     * @description 获取好友的帖子列表
     */
    get: operations['getFriendsPost']
  }
  '/post/getDetail': {
    /**
     * 获取帖子详情
     * @description 获取帖子详情
     */
    get: operations['getDetail']
  }
  '/post/getByUser': {
    /**
     * 获取指定用户的帖子列表
     *  用于查看个人主页
     * @description 获取指定用户的帖子列表
     *  用于查看个人主页
     */
    get: operations['getByUser']
  }
  '/help/get': {
    /**
     * 获取简要常见问题
     * @description 获取简要常见问题
     */
    get: operations['getSuggestions_1']
  }
  '/help/getDetail': {
    /**
     * 获取常见问题详情
     * @description 获取常见问题详情
     */
    get: operations['getDetail_1']
  }
  '/comment/get': {
    /**
     * 获取评论列表
     * @description 获取评论列表
     */
    get: operations['getList_2']
  }
  '/comment/getDetail': {
    /**
     * 获取评论详情
     * @description 获取评论详情
     */
    get: operations['getDetail_2']
  }
  '/apply/getApplyList': {
    /**
     * 获取好友申请列表
     * @description 获取好友申请列表
     */
    get: operations['getApplyList']
  }
  '/user/delete': {
    /**
     * 删除用户
     * @description 删除用户
     */
    delete: operations['deleteUser']
  }
  '/reply/del': {
    /**
     * 删除回复
     * @description 删除回复
     */
    delete: operations['delReply']
  }
  '/relation/del': {
    /**
     * 删除好友
     * @description 删除好友
     */
    delete: operations['deleteFriend']
  }
  '/post/del': {
    /**
     * 删除帖子
     * @description 删除帖子
     */
    delete: operations['delete']
  }
  '/comment/del': {
    /**
     * 删除评论
     * @description 删除评论
     */
    delete: operations['delete_1']
  }
}

export type webhooks = Record<string, never>

export interface components {
  schemas: {
    /** @description 通用返回结果 */
    ResultObject: {
      /**
       * Format: int32
       * @description 代码
       */
      code?: number
      /** @description 返回数据 */
      data?: Record<string, never>
      /** @description 信息 */
      msg?: string
    }
    /** @description 更新用户请求 */
    UpdateUserRequest: {
      /** @description 名字 */
      name?: string
      /**
       * Format: int32
       * @description 性别
       */
      gender?: number
      /** @description 国籍 */
      nation?: string
      /**
       * Format: int32
       * @description 证件类型
       */
      documentType?: number
      /** @description 证件号码 */
      documentNumber?: string
      /**
       * Format: date-time
       * @description 证件有效期
       */
      documentValidDate?: string
      /** @description 手机号 */
      phone?: string
      /** @description 工作 */
      job?: string
      /** @description 地址 */
      address?: string
      /** @description 头像url */
      avatar?: string
    }
    /** @description 通用返回结果 */
    ResultUser: {
      /**
       * Format: int32
       * @description 代码
       */
      code?: number
      data?: components['schemas']['User']
      /** @description 信息 */
      msg?: string
    }
    /** @description 用户 */
    User: {
      /**
       * Format: int64
       * @description 用户 ID
       */
      id?: number
      /**
       * Format: int32
       * @description 用户类型
       */
      type?: number
      /** @description openId */
      openId?: string
      /**
       * Format: date-time
       * @description 创建时间
       */
      createTime?: string
      /**
       * Format: date-time
       * @description 删除时间
       */
      deleteTime?: string
      /** @description 名字 */
      name?: string
      /**
       * Format: int32
       * @description 性别
       */
      gender?: number
      /** @description 是否实名认证 */
      isVerified?: boolean
      /** @description 国籍 */
      nation?: string
      /**
       * Format: int32
       * @description 证件类型
       */
      documentType?: number
      /** @description 证件号码 */
      documentNumber?: string
      /**
       * Format: date-time
       * @description 证件有效期
       */
      documentValidDate?: string
      /** @description 手机号 */
      phone?: string
      /** @description 工作 */
      job?: string
      /** @description 地址 */
      address?: string
      /** @description 头像url */
      avatar?: string
    }
    /** @description 上传意见反馈请求 */
    AddSuggestionRequest: {
      /** @description 标题 */
      title?: string
      /** @description 内容 */
      content?: string
      /** @description 图片 */
      image?: string
    }
    /** @description 通用返回结果 */
    ResultBoolean: {
      /**
       * Format: int32
       * @description 代码
       */
      code?: number
      /** @description 返回数据 */
      data?: boolean
      /** @description 信息 */
      msg?: string
    }
    /** @description 发布回复请求 */
    AddReplyRequest: {
      /** @description 回复内容 */
      content?: string
      /**
       * Format: int64
       * @description 评论id
       */
      commentId?: number
      /**
       * Format: int64
       * @description 被回复的id
       *  如果此回复是指向另一个回复的，则字段存在，否则为null
       */
      toId?: number
    }
    /** @description 用户视角评论信息 */
    ReplyResponse: {
      /**
       * Format: int64
       * @description id
       */
      id?: number
      /**
       * Format: int64
       * @description 评论 id
       */
      commentId?: number
      /**
       * Format: int64
       * @description 被回复的 id
       *  如果此回复是指向另一个回复的，则字段存在，否则为null
       */
      toId?: number
      /**
       * Format: int64
       * @description 用户 id
       */
      userId?: number
      /**
       * @description 被回复的用户 id
       *  如果此回复是指向另一个回复的，则字段存在，否则为null
       */
      toUserId?: string
      /**
       * Format: date-time
       * @description 创建时间
       */
      createTime?: string
      /**
       * Format: date-time
       * @description 删除时间
       */
      deleteTime?: string
      /** @description 内容 */
      content?: string
      /**
       * Format: int64
       * @description 点赞数
       */
      likes?: number
      /** @description 用户名字 */
      name?: string
      /** @description 用户头像 */
      avatar?: string
      /**
       * @description 被回复的用户名字
       *  如果此回复是指向另一个回复的，则字段存在，否则为null
       */
      toName?: string
      /** @description 是否点赞 */
      isLiked?: boolean
    }
    /** @description 通用返回结果 */
    ResultReplyResponse: {
      /**
       * Format: int32
       * @description 代码
       */
      code?: number
      data?: components['schemas']['ReplyResponse']
      /** @description 信息 */
      msg?: string
    }
    /** @description 发布帖子请求 */
    AddPostRequest: {
      /** @description 内容 */
      content?: string
      /** @description 图片 */
      image?: string
    }
    /** @description 用户视角帖子信息 */
    PostResponse: {
      /**
       * Format: int64
       * @description 帖子 ID
       */
      id?: number
      /**
       * Format: date-time
       * @description 创建时间
       */
      createTime?: string
      /**
       * Format: date-time
       * @description 更新时间
       */
      updateTime?: string
      /**
       * Format: date-time
       * @description 删除时间
       */
      deleteTime?: string
      /** @description 内容 */
      content?: string
      /**
       * Format: int64
       * @description 发布用户 ID
       */
      userId?: number
      /** @description 图片 */
      image?: string
      /**
       * Format: int64
       * @description 点赞数
       */
      likes?: number
      /**
       * Format: int64
       * @description 评论数
       */
      comments?: number
      /**
       * Format: int64
       * @description 分享数
       */
      shares?: number
      /** @description 发帖用户名字 */
      name?: string
      /** @description 发帖用户头像 */
      avatar?: string
      /** @description 是否点赞 */
      isLiked?: boolean
    }
    /** @description 通用返回结果 */
    ResultPostResponse: {
      /**
       * Format: int32
       * @description 代码
       */
      code?: number
      data?: components['schemas']['PostResponse']
      /** @description 信息 */
      msg?: string
    }
    /** @description 改变点赞状态请求 */
    DoLikeRequest: {
      /**
       * Format: int64
       * @description 对象id
       */
      objId?: number
      /**
       * Format: int32
       * @description 类型
       */
      type?: number
    }
    /** @description 通用返回结果 */
    ResultString: {
      /**
       * Format: int32
       * @description 代码
       */
      code?: number
      /** @description 返回数据 */
      data?: string
      /** @description 信息 */
      msg?: string
    }
    /** @description 发布评论请求 */
    AddCommentRequest: {
      /** @description 评论内容 */
      content?: string
      /**
       * Format: int64
       * @description 帖子id
       */
      postId?: number
    }
    /** @description 用户视角评论信息 */
    CommentResponse: {
      /**
       * Format: int64
       * @description 评论 ID
       */
      id?: number
      /**
       * Format: int64
       * @description 帖子 ID
       */
      postId?: number
      /**
       * Format: int64
       * @description 楼层
       */
      floor?: number
      /**
       * Format: int64
       * @description 用户 ID
       */
      userId?: number
      /**
       * Format: date-time
       * @description 创建时间
       */
      createTime?: string
      /**
       * Format: date-time
       * @description 删除时间
       */
      deleteTime?: string
      /** @description 内容 */
      content?: string
      /**
       * Format: int64
       * @description 点赞数
       */
      likes?: number
      /**
       * Format: int64
       * @description 回复数
       */
      replies?: number
      /**
       * Format: int64
       * @description 分享数
       */
      shares?: number
      /** @description 用户名字 */
      name?: string
      /** @description 用户头像 */
      avatar?: string
      /** @description 是否点赞 */
      isLiked?: boolean
    }
    /** @description 通用返回结果 */
    ResultCommentResponse: {
      /**
       * Format: int32
       * @description 代码
       */
      code?: number
      data?: components['schemas']['CommentResponse']
      /** @description 信息 */
      msg?: string
    }
    /** @description 登录响应 */
    LoginResponse: {
      /** @description token */
      token?: string
      /**
       * Format: int64
       * @description 用户 ID
       */
      userId?: number
      /**
       * Format: int32
       * @description 用户类型
       */
      type?: number
    }
    /** @description 通用返回结果 */
    ResultLoginResponse: {
      /**
       * Format: int32
       * @description 代码
       */
      code?: number
      data?: components['schemas']['LoginResponse']
      /** @description 信息 */
      msg?: string
    }
    /** @description 通用返回结果 */
    ResultListSuggestion: {
      /**
       * Format: int32
       * @description 代码
       */
      code?: number
      /** @description 返回数据 */
      data?: components['schemas']['Suggestion'][]
      /** @description 信息 */
      msg?: string
    }
    /** @description 意见反馈 */
    Suggestion: {
      /**
       * Format: int64
       * @description 意见反馈 ID
       */
      id?: number
      /** @description 标题 */
      title?: string
      /** @description 内容 */
      content?: string
      /** @description 图片 */
      image?: string
      /**
       * Format: int64
       * @description 反馈用户 ID
       */
      userId?: number
      /**
       * Format: date-time
       * @description 创建时间
       */
      createTime?: string
    }
    /** @description 搜索用户列表用户视角简要信息 */
    BriefUserResponse: {
      /**
       * Format: int64
       * @description 用户 ID
       */
      id?: number
      /**
       * Format: int32
       * @description 用户类型
       */
      type?: number
      /** @description 用户名 */
      name?: string
      /** @description 头像 */
      avatar?: string
      /** @description 是否已添加 */
      isFriend?: boolean
    }
    /** @description 通用返回结果 */
    ResultListBriefUserResponse: {
      /**
       * Format: int32
       * @description 代码
       */
      code?: number
      /** @description 返回数据 */
      data?: components['schemas']['BriefUserResponse'][]
      /** @description 信息 */
      msg?: string
    }
    /** @description 通用返回结果 */
    ResultListPostResponse: {
      /**
       * Format: int32
       * @description 代码
       */
      code?: number
      /** @description 返回数据 */
      data?: components['schemas']['PostResponse'][]
      /** @description 信息 */
      msg?: string
    }
    /** @description 通用返回结果 */
    ResultListReplyResponse: {
      /**
       * Format: int32
       * @description 代码
       */
      code?: number
      /** @description 返回数据 */
      data?: components['schemas']['ReplyResponse'][]
      /** @description 信息 */
      msg?: string
    }
    /** @description 用户视角好友简要信息 */
    BriefFriendResponse: {
      /**
       * Format: int64
       * @description 用户 ID
       */
      id?: number
      /**
       * Format: int32
       * @description 用户类型
       */
      type?: number
      /** @description 用户名 */
      name?: string
      /** @description 头像 */
      avatar?: string
    }
    /** @description 通用返回结果 */
    ResultListBriefFriendResponse: {
      /**
       * Format: int32
       * @description 代码
       */
      code?: number
      /** @description 返回数据 */
      data?: components['schemas']['BriefFriendResponse'][]
      /** @description 信息 */
      msg?: string
    }
    /** @description 简要帖子信息 */
    BriefPostResponse: {
      /**
       * Format: int64
       * @description 帖子 ID
       */
      id?: number
      /** @description 内容 */
      content?: string
      /** @description 图片 */
      image?: string
    }
    /** @description 通用返回结果 */
    ResultListBriefPostResponse: {
      /**
       * Format: int32
       * @description 代码
       */
      code?: number
      /** @description 返回数据 */
      data?: components['schemas']['BriefPostResponse'][]
      /** @description 信息 */
      msg?: string
    }
    /** @description 简要常见问题信息 */
    BriefHelpDto: {
      /**
       * Format: int64
       * @description 常见问题 ID
       */
      id?: number
      /** @description 标题 */
      title?: string
    }
    /** @description 通用返回结果 */
    ResultListBriefHelpDto: {
      /**
       * Format: int32
       * @description 代码
       */
      code?: number
      /** @description 返回数据 */
      data?: components['schemas']['BriefHelpDto'][]
      /** @description 信息 */
      msg?: string
    }
    /** @description 常见问题 */
    Help: {
      /**
       * Format: int64
       * @description 常见问题 ID
       */
      id?: number
      /** @description 标题 */
      title?: string
      /** @description 内容 */
      content?: string
      /** @description 图片 */
      image?: string
      /**
       * Format: int64
       * @description 发布用户 ID
       */
      userId?: number
      /**
       * Format: date-time
       * @description 创建时间
       */
      createTime?: string
    }
    /** @description 通用返回结果 */
    ResultHelp: {
      /**
       * Format: int32
       * @description 代码
       */
      code?: number
      data?: components['schemas']['Help']
      /** @description 信息 */
      msg?: string
    }
    /** @description 通用返回结果 */
    ResultListCommentResponse: {
      /**
       * Format: int32
       * @description 代码
       */
      code?: number
      /** @description 返回数据 */
      data?: components['schemas']['CommentResponse'][]
      /** @description 信息 */
      msg?: string
    }
    /** @description 联查申请添加好友信息 */
    ApplyDto: {
      /**
       * Format: int64
       * @description 申请 ID
       */
      id?: number
      /**
       * Format: int64
       * @description 发送好友申请的用户 ID
       */
      userId?: number
      /**
       * Format: date-time
       * @description 创建时间
       */
      createTime?: string
      /** @description 用户名 */
      name?: string
      /** @description 用户头像 */
      avatar?: string
    }
    /** @description 通用返回结果 */
    ResultListApplyDto: {
      /**
       * Format: int32
       * @description 代码
       */
      code?: number
      /** @description 返回数据 */
      data?: components['schemas']['ApplyDto'][]
      /** @description 信息 */
      msg?: string
    }
    /** @description 通用返回结果 */
    ResultInteger: {
      /**
       * Format: int32
       * @description 代码
       */
      code?: number
      /**
       * Format: int32
       * @description 返回数据
       */
      data?: number
      /** @description 信息 */
      msg?: string
    }
  }
  responses: never
  parameters: never
  requestBodies: never
  headers: never
  pathItems: never
}

export type $defs = Record<string, never>

export type external = Record<string, never>

export interface operations {
  /**
   * 用户更新信息
   * @description 用户更新信息
   */
  update: {
    /** @description 更新信息 */
    requestBody: {
      content: {
        'application/json': components['schemas']['UpdateUserRequest']
      }
    }
    responses: {
      /** @description 更新结果 */
      200: {
        content: {
          'application/json': components['schemas']['ResultUser']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 添加意见反馈
   * @description 添加意见反馈
   */
  addSuggestion: {
    /** @description 添加意见反馈请求 */
    requestBody: {
      content: {
        'application/json': components['schemas']['AddSuggestionRequest']
      }
    }
    responses: {
      /** @description 是否添加成功 */
      200: {
        content: {
          'application/json': components['schemas']['ResultBoolean']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 添加回复
   * @description 添加回复
   */
  addReply: {
    /** @description 添加回复请求 */
    requestBody: {
      content: {
        'application/json': components['schemas']['AddReplyRequest']
      }
    }
    responses: {
      /** @description 是否添加成功 */
      200: {
        content: {
          'application/json': components['schemas']['ResultReplyResponse']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 分享帖子
   * @description 分享帖子
   */
  share: {
    parameters: {
      query: {
        /** @description 帖子id */
        postId: number
      }
    }
    responses: {
      /** @description 数据库修改是否成功 */
      200: {
        content: {
          '*/*': components['schemas']['ResultBoolean']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 添加帖子
   * @description 添加帖子
   */
  addPost: {
    /** @description 添加帖子请求 */
    requestBody: {
      content: {
        'application/json': components['schemas']['AddPostRequest']
      }
    }
    responses: {
      /** @description 是否添加成功 */
      200: {
        content: {
          'application/json': components['schemas']['ResultPostResponse']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 取消点赞
   * @description 取消点赞
   */
  unlike: {
    /** @description 取消点赞请求 */
    requestBody: {
      content: {
        'application/json': components['schemas']['DoLikeRequest']
      }
    }
    responses: {
      /** @description 是否取消点赞成功 */
      200: {
        content: {
          'application/json': components['schemas']['ResultBoolean']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 点赞
   * @description 点赞
   */
  like: {
    /** @description 点赞请求 */
    requestBody: {
      content: {
        'application/json': components['schemas']['DoLikeRequest']
      }
    }
    responses: {
      /** @description 是否点赞成功 */
      200: {
        content: {
          'application/json': components['schemas']['ResultBoolean']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 上传图片
   * @description 上传图片
   */
  uploadImage: {
    /** @description 文件 */
    requestBody: {
      content: {
        'application/json': {
          /** Format: binary */
          file?: string
        }
      }
    }
    responses: {
      /** @description 图片地址 */
      200: {
        content: {
          '*/*': components['schemas']['ResultString']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 分享评论
   * @description 分享评论
   */
  share_1: {
    parameters: {
      query: {
        /** @description 评论id */
        commentId: number
      }
    }
    responses: {
      /** @description 数据库修改是否成功 */
      200: {
        content: {
          '*/*': components['schemas']['ResultBoolean']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 评论
   * @description 评论
   */
  comment: {
    /** @description 评论请求 */
    requestBody: {
      content: {
        'application/json': components['schemas']['AddCommentRequest']
      }
    }
    responses: {
      /** @description 评论结果 */
      200: {
        content: {
          'application/json': components['schemas']['ResultCommentResponse']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 处理好友申请
   * @description 处理好友申请
   */
  handle: {
    parameters: {
      query: {
        /** @description 申请id */
        applyId: number
        /** @description 是否同意 */
        decision: boolean
      }
    }
    responses: {
      /** @description 是否处理成功 */
      200: {
        content: {
          '*/*': components['schemas']['ResultBoolean']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 此用户申请添加指定用户为好友
   * @description 此用户申请添加指定用户为好友
   */
  apply: {
    parameters: {
      query: {
        /** @description 被申请用户id */
        toUserId: number
      }
    }
    responses: {
      /** @description 是否申请成功 */
      200: {
        content: {
          '*/*': components['schemas']['ResultBoolean']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 用户登录
   * @description 用户登录
   */
  login: {
    parameters: {
      query: {
        /** @description 微信code */
        code: string
      }
    }
    responses: {
      /** @description 登录结果 */
      200: {
        content: {
          '*/*': components['schemas']['ResultLoginResponse']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 获取用户信息
   * @description 获取用户信息
   */
  info: {
    responses: {
      /** @description 用户信息 */
      200: {
        content: {
          '*/*': components['schemas']['ResultUser']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 获取指定id的用户信息
   * @description 获取指定id的用户信息
   */
  info_1: {
    parameters: {
      query: {
        /** @description 用户id */
        id: number
      }
    }
    responses: {
      /** @description 用户信息 */
      200: {
        content: {
          '*/*': components['schemas']['ResultUser']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 检查登录态
   * @description 检查登录态
   */
  check: {
    responses: {
      /** @description 是否登录且token有效 */
      200: {
        content: {
          '*/*': components['schemas']['ResultBoolean']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  test502: {
    responses: {
      /** @description OK */
      200: {
        content: never
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  test500: {
    responses: {
      /** @description OK */
      200: {
        content: never
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  test404: {
    responses: {
      /** @description OK */
      200: {
        content: never
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  test403: {
    responses: {
      /** @description OK */
      200: {
        content: never
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  test401: {
    responses: {
      /** @description OK */
      200: {
        content: never
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  test400: {
    responses: {
      /** @description OK */
      200: {
        content: never
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  test200: {
    responses: {
      /** @description OK */
      200: {
        content: never
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 获取意见反馈列表
   * @description 获取意见反馈列表
   */
  getSuggestions: {
    parameters: {
      query: {
        /** @description 页码 */
        page: number
        /** @description 每页数量 */
        pageSize: number
      }
    }
    responses: {
      /** @description 意见反馈列表 */
      200: {
        content: {
          '*/*': components['schemas']['ResultListSuggestion']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 根据关键词搜索用户
   * @description 根据关键词搜索用户
   */
  getUserList: {
    parameters: {
      query: {
        /** @description 页码 */
        page: number
        /** @description 页大小 */
        pageSize: number
        /** @description 关键词 */
        keyword: string
      }
    }
    responses: {
      /** @description 用户列表 */
      200: {
        content: {
          '*/*': components['schemas']['ResultListBriefUserResponse']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  getPosts: {
    parameters: {
      query: {
        page: number
        pageSize: number
        keyword: string
      }
    }
    responses: {
      /** @description OK */
      200: {
        content: {
          '*/*': components['schemas']['ResultListPostResponse']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 获取回复列表
   * @description 获取回复列表
   */
  getList: {
    parameters: {
      query: {
        /** @description 页码 */
        page: number
        /** @description 页大小 */
        pageSize: number
        /** @description 评论id */
        commentId: number
      }
    }
    responses: {
      /** @description 回复列表 */
      200: {
        content: {
          '*/*': components['schemas']['ResultListReplyResponse']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 获取好友列表
   * @description 获取好友列表
   */
  getFriendList: {
    parameters: {
      query: {
        /** @description 页码 */
        page: number
        /** @description 页大小 */
        pageSize: number
      }
    }
    responses: {
      /** @description 好友列表 */
      200: {
        content: {
          '*/*': components['schemas']['ResultListBriefFriendResponse']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 获取帖子列表
   * @description 获取帖子列表
   */
  getList_1: {
    parameters: {
      query: {
        /** @description 页码 */
        page: number
        /** @description 页大小 */
        pageSize: number
        /** @description 是否按照热度排序 */
        orderByPopularity: boolean
      }
    }
    responses: {
      /** @description 帖子列表 */
      200: {
        content: {
          '*/*': components['schemas']['ResultListPostResponse']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 获取好友的帖子列表
   * @description 获取好友的帖子列表
   */
  getFriendsPost: {
    parameters: {
      query: {
        /** @description 页码 */
        page: number
        /** @description 页大小 */
        pageSize: number
      }
    }
    responses: {
      /** @description 好友的帖子列表 */
      200: {
        content: {
          '*/*': components['schemas']['ResultListPostResponse']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 获取帖子详情
   * @description 获取帖子详情
   */
  getDetail: {
    parameters: {
      query: {
        /** @description 帖子id */
        postId: number
      }
    }
    responses: {
      /** @description 帖子详情 */
      200: {
        content: {
          '*/*': components['schemas']['ResultPostResponse']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 获取指定用户的帖子列表
   *  用于查看个人主页
   * @description 获取指定用户的帖子列表
   *  用于查看个人主页
   */
  getByUser: {
    parameters: {
      query: {
        /** @description 用户id */
        userId: number
        /** @description 页码 */
        page: number
        /** @description 页大小 */
        pageSize: number
      }
    }
    responses: {
      /** @description 用户的帖子 */
      200: {
        content: {
          '*/*': components['schemas']['ResultListBriefPostResponse']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 获取简要常见问题
   * @description 获取简要常见问题
   */
  getSuggestions_1: {
    parameters: {
      query: {
        /** @description 页码 */
        page: number
        /** @description 每页数量 */
        pageSize: number
      }
    }
    responses: {
      /** @description 简要常见问题列表 */
      200: {
        content: {
          '*/*': components['schemas']['ResultListBriefHelpDto']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 获取常见问题详情
   * @description 获取常见问题详情
   */
  getDetail_1: {
    parameters: {
      query: {
        /** @description 帮助id */
        id: number
      }
    }
    responses: {
      /** @description 帮助详情 */
      200: {
        content: {
          '*/*': components['schemas']['ResultHelp']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 获取评论列表
   * @description 获取评论列表
   */
  getList_2: {
    parameters: {
      query: {
        /** @description 页码 */
        page: number
        /** @description 页大小 */
        pageSize: number
        /** @description 帖子id */
        postId: number
      }
    }
    responses: {
      /** @description 评论列表 */
      200: {
        content: {
          '*/*': components['schemas']['ResultListCommentResponse']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 获取评论详情
   * @description 获取评论详情
   */
  getDetail_2: {
    parameters: {
      query: {
        /** @description 评论id */
        commentId: number
      }
    }
    responses: {
      /** @description 评论详情 */
      200: {
        content: {
          '*/*': components['schemas']['ResultCommentResponse']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 获取好友申请列表
   * @description 获取好友申请列表
   */
  getApplyList: {
    parameters: {
      query: {
        /** @description 页码 */
        page: number
        /** @description 页大小 */
        pageSize: number
      }
    }
    responses: {
      /** @description 申请列表 */
      200: {
        content: {
          '*/*': components['schemas']['ResultListApplyDto']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 删除用户
   * @description 删除用户
   */
  deleteUser: {
    responses: {
      /** @description 删除结果 */
      200: {
        content: {
          '*/*': components['schemas']['ResultInteger']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 删除回复
   * @description 删除回复
   */
  delReply: {
    parameters: {
      query: {
        /** @description 回复id */
        replyId: number
      }
    }
    responses: {
      /** @description 是否删除成功 */
      200: {
        content: {
          '*/*': components['schemas']['ResultBoolean']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 删除好友
   * @description 删除好友
   */
  deleteFriend: {
    parameters: {
      query: {
        /** @description 好友id */
        friendId: number
      }
    }
    responses: {
      /** @description 是否删除成功 */
      200: {
        content: {
          '*/*': components['schemas']['ResultBoolean']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 删除帖子
   * @description 删除帖子
   */
  delete: {
    parameters: {
      query: {
        /** @description 帖子id */
        postId: number
      }
    }
    responses: {
      /** @description 数据库修改是否成功 */
      200: {
        content: {
          '*/*': components['schemas']['ResultBoolean']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
  /**
   * 删除评论
   * @description 删除评论
   */
  delete_1: {
    parameters: {
      query: {
        /** @description 评论id */
        commentId: number
      }
    }
    responses: {
      /** @description 数据库修改是否成功 */
      200: {
        content: {
          '*/*': components['schemas']['ResultBoolean']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          '*/*': components['schemas']['ResultObject']
        }
      }
    }
  }
}
