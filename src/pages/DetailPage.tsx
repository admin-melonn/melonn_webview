import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PostService } from '../services/post-service'
import { PostDisplayType, PostType } from '../services/post-service/types'
import ContentDisplay from '../components/morecules/ContentDisplay'
import { useUserStore } from '../store/useUserStore'
import CommentDisplay from '../components/organisms/CommentDisplay'
import { useReplyStore } from '../store/useReplyStore'
import { CommentDisplayType } from '../services/comment-service/types'
import CustomAlert from '../components/organisms/CustomAlert'

const DetailPage = () => {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { imgUrl } = useUserStore()
  const [content, setContent] = useState<PostDisplayType | null>(null)
  const { setParent } = useReplyStore()

  const returnNestedComments = (
    replies: CommentDisplayType[],
    parentCommentId: string
  ) => {
    const comment = replies.find(
      (reply) => reply.parentCommentId == parentCommentId
    )

    if (comment) {
      const findNested = returnNestedComments(replies, comment.commentId)
      if (findNested) {
        comment.comments = findNested
      }
      return [comment]
    } else {
      return false
    }
  }

  const getPost = async () => {
    const res = await PostService.GetPost('postId', id)

    if (res && res.length > 0) {
      let totalComments: CommentDisplayType[] = []
      if (res[0].comments) {
        let replies = res[0].comments.filter((doc) => doc.parentCommentId)
        if (replies && replies.length > 0) {
          res[0].comments
            .filter((doc) => !doc.parentCommentId)
            .forEach((doc) => {
              const findNested = returnNestedComments(replies, doc.commentId)
              if (findNested) {
                const temporal = {
                  ...doc,
                  comments: findNested as CommentDisplayType[],
                }
                totalComments.push(temporal)
              } else {
                totalComments.push(doc)
              }
            })
        } else {
          totalComments = res[0].comments
        }
      }
      setContent({
        ...res[0],
        comments: totalComments,
      })
    }
  }

  useEffect(() => {
    getPost()
  }, [id])

  const reply = (comment: CommentDisplayType) => {
    if (!content) return

    const conversation: {
      commenterType: 'user' | 'assistant'
      content: string
    }[] = [
      {
        commenterType: 'user',
        content: content.content,
      },
    ]
    let cmts = [comment]
    let c = 0
    while (cmts && c < 10) {
      let cmt = cmts.pop()
      if (!cmt) {
        break
      }

      if (cmt.comments) {
        cmts.push(cmt.comments[0])
      }
      conversation.push({
        commenterType: cmt.createdBy == 'user' ? 'user' : 'assistant',
        content: cmt.content,
      })
      console.log('복ㄷ ', cmt)
      c += 1
    }
    console.log('대화 : ', conversation)

    setParent({
      profileUrl: comment.user ? comment.user.profileImageUrl : '',
      name: comment.user ? comment.user.name : '',
      content: comment.content,
      createdAt: comment.createdAt,
      postId: comment.postId,
      userId: comment.userId,
      conversation: conversation,
    })
    navigate(`/write/${comment?.commentId}`)
  }
  const [alertOpen, setAlertOpen] = React.useState(false)

  return (
    <div>
      <CustomAlert open={alertOpen} setOpen={setAlertOpen} onClick={() => {}} />
      {content && (
        <>
          <div className='grid gap-2 grid-flex-row grid-cols-6 border border-b-gray-100 w-full p-3 h-[44px] justify-between content-center'>
            <div
              className='col-span-1 text-[14px] flex flex-row content-center justify-start'
              onClick={() => {
                navigate(-1)
              }}
            >
              <img src='/svg/left.svg' className='w-5' />
              <div className='content-center flex justify-center text-[16px]'>
                Back
              </div>
            </div>
            <div className='col-span-4 text-center font-semibold text-[17px] content-center'>
              Post
            </div>
            <div className='col-span-1 justify-end content-end flex'></div>
          </div>
          <div className='pt-2'>
            {
              <ContentDisplay
                types='comment'
                content={content}
                isLine={false}
                isMain={true}
              />
            }
          </div>
          <div className='px-4 py-2 mt-4 mb-0 border-y border-gray-200/60'>
            <div className='font-semibold text-[14px]'>Comments</div>
          </div>
          <div>
            {content.comments && (
              <>
                {content.comments.map((comment) => {
                  return (
                    <div
                      key={comment.commentId}
                      className='border-b border-gray-200/60 pt-2 pb-1'
                    >
                      <CommentDisplay
                        comment={comment}
                        isLine={
                          comment.comments && comment.comments.length > 0
                            ? true
                            : false
                        }
                      />
                      <div
                        className='pl-12 pb-2 text-[15px] mt-[-8px] text-gray-400'
                        onClick={() => {
                          reply(comment)
                        }}
                      >
                        Reply
                      </div>
                    </div>
                  )
                })}
              </>
            )}
          </div>
          <div className='fixed w-full p-3 bg-white/70 border-t bottom-0 backdrop-blur-sm'>
            <div
              className='bg-gray-200/50 p-[6px] rounded-full flex flex-row content-center'
              onClick={() => {
                setParent({
                  profileUrl: content.user.profileImageUrl,
                  name: content.user.name,
                  content: content.content,
                  createdAt: content.createdAt,
                  postId: content.postId,
                  userId: content.userId,
                })
                navigate(`/write/${content?.postId}`)
              }}
            >
              <img
                src={!imgUrl ? imgUrl : '/svg/profile.svg'}
                className='w-7'
              />
              <p className='text-gray-400 ml-1 text-[14px] font-[500] content-center'>
                Add comment to this Post...
              </p>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
        </>
      )}
    </div>
  )
}

export default DetailPage
