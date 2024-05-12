import React, { useEffect } from "react";
import useCommentStore from "../store/commentStore";
import useStore from "../store";
import { Modal } from "@mantine/core";
import { useComments, useDeleteComment } from "../hooks/post-hook";
import NoProfile from "../assets/profile.png";

const Comments = () => {
  const { openComment, commentId, setOpen } = useCommentStore();
  const { user } = useStore();

  const { data, mutate } = useComments();

  const useDelete = useDeleteComment(user?.token);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    useDelete.mutate({ id, postId: commentId });
  };

  useEffect(() => {
    mutate(commentId);
  }, [commentId]);

  return (
    <>
      <Modal
        // size='md'
        opened={openComment}
        onClose={handleClose}
        title={`Comments (${data?.data?.length})`}
        centered
      >
        <div className='w-full h-full pb-6'>
          <div className='w-full h-full flex flex-col gap-6 px-2'>
            {data?.data?.map(({ _id, user, desc, post, createdAt }) => {
              <div key={_id} className='w-full flex gap-4'>
                <img
                  src={user?.image || NoProfile}
                  alt='Profile'
                  className='w-10 h-10 rounded-full object-cover'
                />

                <div className='w-full'>
                  <div className='w-full flex justify-between'>
                    <div className='w-full flex items-center gap-2'>
                      <p className='text-slate-600 dark:text-gray-400 font-medium'>
                        {user.name}
                      </p>
                      <span className='text-slate-700 dark:text-gray-500 text-xs italic'>
                        {new Date(createdAt).toDateString()}
                      </span>
                    </div>

                    <span
                      className='text-sm text-red-600 cursor-pointer'
                      onClick={() => handleDelete(_id)}
                    >
                      Delete
                    </span>
                  </div>

                  <span className='text-sm to-gray-700 dark:text-gray-500'>
                    {desc}
                  </span>
                </div>
              </div>;
            })}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Comments;
