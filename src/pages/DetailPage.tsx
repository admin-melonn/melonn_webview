import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PostService } from '../services/post-service'
import { PostDisplayType, PostType } from '../services/post-service/types'
import ContentDisplay from '../components/morecules/ContentDisplay'
import { useUserStore } from '../store/useUserStore'
import CommentDisplay from '../components/organisms/CommentDisplay'
import { useReplyStore } from '../store/useReplyStore'

const DetailPage = () => {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { imgUrl } = useUserStore()
  const [content, setContent] = useState<PostDisplayType | null>(null)
  const { setParent } = useReplyStore()

  const getPost = async () => {
    const res = await PostService.GetPost('postId', id)
    console.log('결고 ㅏ : ', res)

    if (res && res.length > 0) {
      setContent(res[0])
    }
  }

  useEffect(() => {
    getPost()
  }, [id])

  return (
    <div>
      {content && (
        <>
          <div className='grid gap-2 grid-flex-row grid-cols-6 border border-b-gray-100 w-full p-3 h-[50px] justify-between content-center'>
            <div
              className='col-span-1 text-[14px] flex flex-row content-center justify-start'
              onClick={() => {
                navigate(-1)
              }}
            >
              <img src='/svg/left.svg' className='w-5' />
              <div className='content-center flex justify-center text-[17px]'>
                Back
              </div>
            </div>
            <div className='col-span-4 text-center font-semibold text-[18px] content-center'>
              Post
            </div>
            <div className='col-span-1 justify-end content-end flex'></div>
          </div>
          <div className='pt-2'>
            {<ContentDisplay content={content} isLine={false} isMain={true} />}
          </div>
          <div className='px-4 py-2 mt-4 mb-3 border-y border-gray-100'>
            <div className='font-semibold text-[14px]'>Comments</div>
          </div>
          <div>
            {content.comments && (
              <>
                {content.comments.map((comment, index) => {
                  return (
                    <div key={comment.commentId}>
                      <CommentDisplay
                        comment={comment}
                        isLine={index + 1 != content.comments?.length}
                      />
                      <div
                        className='pl-12 pb-2 text-gray-400'
                        onClick={() => {
                          setParent({
                            profileUrl: comment.user
                              ? comment.user.profileImageUrl
                              : '',
                            name: comment.user ? comment.user.name : '',
                            content: comment.content,
                            createdAt: comment.createdAt,
                            postId: comment.postId,
                            userId: comment.userId,
                          })
                          navigate(`/write/${comment?.commentId}`)
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
          <div className='fixed w-full p-3 bg-white border-t bottom-0'>
            <div
              className='bg-gray-100/90 p-[6px] rounded-full flex flex-row content-center'
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
        </>
      )}
    </div>
  )
}

export default DetailPage
