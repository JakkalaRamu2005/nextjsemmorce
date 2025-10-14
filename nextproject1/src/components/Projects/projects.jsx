import { projectsData } from './data'
import './projects.css'
import Image from 'next/image'
const projects = () => {
  return (
    <div className='project-cards'>


      
        {projectsData.map(project => (
          
          <div className='project-card' key={project.id}>
            <div className='image-container'>
              
            <Image src={project.image} height={100} width={100} alt='img' />
            <h1 className='project-heading'> {project.title}</h1>

            </div>

            <div>
              <p className='project-description'>{project.description}</p>
            </div>
          
          </div>

        ))}
      
    </div>
  )
}

export default projects
