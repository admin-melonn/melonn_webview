import React, { useState } from 'react'
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
    formState: { isSubmitting },
  } = useForm<CreatePostDto>()
  const { parent } = useReplyStore()

  const onSubmit = async (dto: CreatePostDto) => {
    console.log('보기 ', dto)
    if (!dto.content) {
      alert('You should write something to post')
    }

    if (parentId && parent) {
      const commentBody: CommentQueryType = {
        commentId: v4(),
        postId: parent.postId,
        content: dto.content,
        userId: userId,
        createdBy: 'ai',
      }
      const res = await CommentService.InsertComment(commentBody)

      const returnText = await chatComplete(dto.prompt2, dto.content)

      if (returnText) {
        const commentBody2: CommentQueryType = {
          commentId: v4(),
          postId: parent.postId,
          content: returnText,
          userId: parent.userId,
          createdBy: 'ai',
        }
        const res2 = await CommentService.InsertComment(commentBody2)
        console.log('댓글에 답글', res2)
      }

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

    const returnText = await chatComplete(dto.prompt2, dto.content)

    if (returnText) {
      const commentBody: CommentQueryType = {
        commentId: v4(),
        postId: postId,
        content: returnText,
        userId: 'c4f5a73d-5a7c-4b2a-b3c0-5b48c64031ee',
        createdBy: 'ai',
      }
      const res = await CommentService.InsertComment(commentBody)
    }

    const returnText2 = await chatComplete(dto.prompt1, dto.content)

    console.log(returnText2)
    if (returnText2) {
      const commentBody: CommentQueryType = {
        commentId: v4(),
        postId: postId,
        content: returnText2,
        userId: 'f6e66503-c0dd-48e4-bf1b-d985e0c7f68d',
        createdBy: 'ai',
      }
      const res = await CommentService.InsertComment(commentBody)
    }

    if (!res) {
      reset({
        content: '',
      })
    }
  }

  return (
    <div className='relative h-full'>
      <div className='grid gap-2 grid-flex-row grid-cols-8 border border-b-gray-100 w-full p-4 h-[50px] justify-center content-center'>
        <div
          className='col-span-2 text-[14px] content-center'
          onClick={() => {
            navigate(-1)
          }}
        >
          Cancel
        </div>
        <div className='col-span-4 text-center font-semibold text-[18px] content-center'>
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
          <div className='flex flex-row'>
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
                      className='w-full mt-2 focus:outline-none resize-none placeholder:text-gray-300'
                      minRows={1}
                    />
                  )}
                />
                <div className='w-full flex flex-row mt-4'>
                  <Icon src='/svg/gallery.svg' />
                  <Icon src='/svg/camera.svg' className='ml-4' />
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
                    defaultValue='You are a really good friend of mine in the sns. You are male and 27 years old. You are not that kind. But you are funny. Answer me like a comment in SNS. Return in Korean'
                    className='w-full mt-12 text-[15px] border focus:outline-none resize-none placeholder:text-gray-300'
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
                    defaultValue='You are a really good friend of mine in the sns. You are female and 27 years old. You are kind and funny. Answer me like a comment in SNS. Return in Korean'
                    className='w-full mt-8 text-[15px] border focus:outline-none resize-none placeholder:text-gray-300'
                    minRows={1}
                  />
                )}
              />
              <p>in mikho__jin</p>
            </div>
          </div>
        </div>
        <div className='absolute w-full left-0 bottom-[0px] p-4 flex justify-between'>
          <div></div>
          <button
            type='submit'
            className='w-[80px] rounded-[120px] p-2 text-center bg-black text-white'
          >
            {isSubmitting ? 'Posting' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default React.memo(WritePage)
