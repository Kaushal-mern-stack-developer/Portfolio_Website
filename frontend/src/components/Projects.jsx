import { useEffect, useState } from 'react'
import MERN_card_image from '../assets/MERN_card_image.jpg'
import { apiRequest } from '../lib/api'

const defaultProjects = [
    {
        id: 'default-1',
        name: 'MongoDb',
        description: 'Complete MERN stack Projects',
        imageUrl: MERN_card_image,
        videoUrl: '',
        sourceUrl: '',
    },
    {
        id: 'default-2',
        name: 'ReactJS',
        description: 'Complete MERN stack Projects',
        imageUrl: MERN_card_image,
        videoUrl: '',
        sourceUrl: '',
    },
]

function Projects({ refreshKey = 0 }) {
    const [projects, setProjects] = useState(defaultProjects)

    useEffect(() => {
        let active = true
        apiRequest('/api/projects')
            .then((data) => {
                if (!active) return
                const list = Array.isArray(data.projects) ? data.projects : []
                if (list.length === 0) {
                    setProjects(defaultProjects)
                } else {
                    setProjects(list.map((p) => ({
                        id: p._id || p.id,
                        name: p.name,
                        description: p.description,
                        imageUrl: p.imageUrl || MERN_card_image,
                        videoUrl: p.videoUrl || '',
                        sourceUrl: p.sourceUrl || '',
                    })))
                }
            })
            .catch(() => {
                if (active) setProjects(defaultProjects)
            })
        return () => { active = false }
    }, [refreshKey])

    return (
        <div name="Projects" className='max-w-screen-2xl container mx-auto px-4 md:px-20 my-20 mt-10'>
            <div>
                <h1 className='font-bold text-3xl mb-5 text-emerald-700 mt-10'>Projects</h1>
                <span className='underline font-bold text-gray-800'>Featured Projects</span>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-5 auto-rows-fr'>
                    {
                        projects.map(({ id, imageUrl, name, description, videoUrl, sourceUrl }) => (
                            <div
                                key={id}
                                className='w-full max-w-75 h-full rounded-lg border-2 border-gray-500 shadow-xl hover:scale-105 duration-300 p-3 cursor-pointer mx-auto flex flex-col'
                            >
                                <img className='w-30 h-30 object-cover p-1 rounded-full border-2 border-gray-300' src={imageUrl || MERN_card_image} alt={name} />
                                <div className='mt-2 flex-1'>
                                    <div className='font-bold'>{name}</div>
                                    <p className='text-sm text-gray-600 break-words'>{description}</p>
                                </div>
                                <div className='flex gap-2 mt-3 flex-wrap'>
                                    {videoUrl ? (
                                        <a href={videoUrl} target='_blank' rel='noopener noreferrer' className='px-3 py-1 bg-blue-500 text-white rounded text-sm'>Video</a>
                                    ) : (
                                        <button type='button' className='px-3 py-1 bg-blue-500 text-white rounded text-sm opacity-60 cursor-not-allowed'>Video</button>
                                    )}
                                    {sourceUrl ? (
                                        <a href={sourceUrl} target='_blank' rel='noopener noreferrer' className='px-3 py-1 bg-gray-200 rounded text-sm'>Source Code</a>
                                    ) : (
                                        <button type='button' className='px-3 py-1 bg-gray-200 rounded text-sm opacity-60 cursor-not-allowed'>Source Code</button>
                                    )}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Projects;
