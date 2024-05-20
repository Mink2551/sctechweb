"use client"

import React from 'react'

function DeleteBtn({ id }) {

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure?");

    if(confirmed) {
      const res = await fetch(`/api/posts?id=${id}`, {
        method: "DELETE"
      })

      if (res.ok) {
        window.location.reload();
      }
    }
  }
  return (
    <a onClick={handleDelete} className="bg-red-500 text-white border cursor-pointer py-1 px-2 rounded-md text-md w-fit">
      Delete
    </a>
  )
}

export default DeleteBtn
