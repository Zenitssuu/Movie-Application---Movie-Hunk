import React from 'react'
import Github from '../components/Github'
function AboutPage() {
  return <div className='min-h-screen w-full grid place-items-center'>
    <div className='max-w-6xl mx-auto flex flex-col items-center gap-5 p-3'>
      <h1 className=' text-3xl md:text-5xl text-center'><span className="font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text text-5xl md:text-8xl">Bloggify!</span></h1>

      <h2 className='text-sm md:text-lg text-justify'>
        Welcome to my latest project - "BLOGGIFY !". I have created this project using latest technologies such as React Js, Node Js, Express Js & MongoDB. Also utilised Material UI to create an amazing and engaging user interface. Here users can see my latest blogs on various articles! Also users who will be given Admin permission can make changes to the website such as edit/delete blogs, keep an eye on the number of users & posts in our website. In order to manage this, an well organised Admin Dashboard is also present. However, in order to maintain security, only Admins will have permission to access this Dashboard.In order to make it more exciting, I have also added a comment section to each and every article so that I can get a valuable feedback on my blogs! Please explore 
        into a world of insightful articles, engaging stories, and expert advice on topics that matter to you. Whether you're looking for the latest trends, thought-provoking ideas, or practical tips, "BLOGGIFY" is your go-to source for inspiration and knowledge. Explore and start your journey of discovery today! Thank You.
      </h2>
      <Github />
    </div>
  </div>
}

export default AboutPage
