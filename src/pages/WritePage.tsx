import React, { useEffect, useState } from 'react'
import { useUserStore } from '../store/useUserStore'
import TextareaAutosize from 'react-textarea-autosize'
import Icon from '../components/atom/Icon'
import { formatDate, timeAgo } from '../utils/formatDate'
import { PostService } from '../services/post-service'
import { v4 } from 'uuid'
import { PostQueryType } from '../services/post-service/types'
import { useNavigate, useParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { chatComplete, openai } from '../services/agent'
import { CommentQueryType } from '../services/comment-service/types'
import { CommentService } from '../services/comment-service'
import ParentContent from '../components/morecules/ParentContent'
import { useReplyStore } from '../store/useReplyStore'
import { Camera, Images } from 'lucide-react'
import { PERSONAS } from '../utils/prompts'
import Snackbar from '../components/morecules/SnackBar'
import { SnackBarTypes } from '../components/morecules/SnackBarUI'

const defaultPrompt1 =
  'You are a really good friend of mine in the sns. You are male and 27 years old. You are not that kind. But you are funny. Answer me like a comment in SNS. Return in Korean'
const defaultPrompt2 =
  'You are a really good friend of mine in the sns. You are male and 27 years old. You are not that kind. But you are funny. Answer me like a comment in SNS. Return in Korean '

interface CreatePostDto {
  content: string
  prompt1: string
  prompt2: string
}

const WritePage = () => {
  const { userId, name, imgUrl } = useUserStore()
  const { parentId = '' } = useParams()
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm<CreatePostDto>()
  const { parent } = useReplyStore()

  useEffect(() => {
    setValue('prompt1', defaultPrompt1)
    setValue('prompt2', defaultPrompt2)
  }, [])

  const postComment = async (dto: CreatePostDto) => {
    if (parent) {
      const recommentId = v4()
      const commentBody: CommentQueryType = {
        commentId: recommentId,
        postId: parent.postId,
        content: dto.content,
        userId: userId,
        parentCommentId: parentId,
        createdBy: 'user',
      }
      const res = await CommentService.InsertComment(commentBody)

      const returnText = await chatComplete(
        dto.prompt2 ? dto.prompt2 : defaultPrompt2,
        dto.content
      )

      if (returnText) {
        const commentBody2: CommentQueryType = {
          commentId: v4(),
          postId: parent.postId,
          content: returnText,
          userId: parent.userId,
          parentCommentId: recommentId,
          createdBy: 'ai',
        }
        const res2 = await CommentService.InsertComment(commentBody2)
        console.log('댓글에 답글', res2)
      }

      return
    }
  }

  const onSubmit = async (dto: CreatePostDto) => {
    console.log('보기 ', dto)
    if (!dto.content) {
      alert('You should write something to post')
    }

    if (parentId && parent) {
      postComment(dto)
      navigate(-1)
      return
    }

    const postId = v4()

    const body: PostQueryType = {
      postId: postId,
      createdAt: new Date().toISOString(),
      userId: userId,
      content: dto.content,
      likesCount: 0,
    }
    const res = await PostService.InsertPost(body)

    PERSONAS.forEach(async (doc, index) => {
      console.log('Commenting... ', doc.id)
      const returnText = await chatComplete(doc.system, doc.user + dto.content)

      if (returnText) {
        let commentText = returnText

        if (
          returnText.toLowerCase().includes('comment: ') ||
          returnText.toLowerCase().includes('comment : ')
        ) {
          const commentIndex = returnText.toLowerCase().indexOf('comment')
          commentText = returnText
            .toLowerCase()
            .substring(commentIndex + 'comment: '.length)
            .trim()
        }

        const commentBody: CommentQueryType = {
          commentId: v4(),
          postId: postId,
          content: commentText,
          userId: doc.id,
          createdBy: 'ai',
        }
        const res = await CommentService.InsertComment(commentBody)

        // 배열의 마지막 요소인지 확인
        if (index === PERSONAS.length - 1) {
          Snackbar.show({
            text: SnackBarTypes.POSTED,
            onClick: () => navigate(`/post/${postId}`),
          })
        }
      }
    })

    Snackbar.show({ text: SnackBarTypes.POSTING })
    if (!res) {
      reset({
        content: '',
      })
    }
    navigate('/')
  }

  return (
    <div className='relative h-full'>
      <div className='grid gap-2 grid-flex-row grid-cols-8 border border-b-gray-100 w-full px-4 py-2 h-[44px] justify-center content-center'>
        <div
          className='col-span-2 text-[14px] content-center'
          onClick={() => {
            navigate(-1)
          }}
        >
          Cancel
        </div>
        <div className='col-span-4 text-center font-semibold text-[16px] content-center'>
          {parentId && parent ? 'Reply' : 'New post'}
        </div>
        <div className='col-span-2 justify-end content-end flex'></div>
      </div>
      {parentId && parent && (
        <>
          <ParentContent />
        </>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='p-2'>
          <div className='flex flex-row pt-2'>
            <div className='flex justify-end items-start p-0 pl-2'>
              <img
                src={imgUrl ? imgUrl : '/svg/profile.svg'}
                className='w-[34px] rounded-full'
              />
            </div>
            <div className='ml-2 w-full'>
              <div className='flex flex-row content-center'>
                <div className='font-bold'>{name}</div>
                <div className='text-gray-400 ml-2 text-sm content-center'>
                  {formatDate(new Date())}
                </div>
              </div>
              <div>
                <Controller
                  control={control}
                  name='content'
                  rules={{
                    required: 'The input is required',
                  }}
                  render={({ field, fieldState }) => (
                    <TextareaAutosize
                      {...field}
                      autoFocus
                      placeholder='please write anything you want'
                      className='w-full mt-2 text-[16px] focus:outline-none resize-none placeholder:text-gray-300'
                      minRows={1}
                    />
                  )}
                />
                <div className='w-full flex flex-row mt-4'>
                  <Images strokeWidth={1.5} />
                  <Camera className='ml-4' strokeWidth={1.5} />
                </div>
              </div>
              <Controller
                control={control}
                name='prompt1'
                rules={{
                  required: 'The input is required',
                }}
                render={({ field, fieldState }) => (
                  <TextareaAutosize
                    {...field}
                    autoFocus
                    placeholder='please write anything you want'
                    defaultValue={defaultPrompt1}
                    className='w-full mt-12 text-[16px] border focus:outline-none resize-none placeholder:text-gray-300'
                    minRows={1}
                  />
                )}
              />
              <p>in _nuaeez_</p>
              <Controller
                control={control}
                name='prompt2'
                rules={{
                  required: 'The input is required',
                }}
                render={({ field, fieldState }) => (
                  <TextareaAutosize
                    {...field}
                    autoFocus
                    placeholder='please write anything you want'
                    defaultValue={defaultPrompt2}
                    className='w-full mt-8 text-[16px] border focus:outline-none resize-none placeholder:text-gray-300'
                    minRows={1}
                  />
                )}
              />
              <p>in mikho__jin</p>
            </div>
          </div>
        </div>
        <div className='fixed w-full left-0 bottom-[0px] py-2 px-4 flex justify-between'>
          <div></div>
          <button
            type='submit'
            disabled={isSubmitting}
            className='rounded-[120px] py-2 px-5 text-center bg-black text-white font-medium'
          >
            {isSubmitting ? 'Posting' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default React.memo(WritePage)
