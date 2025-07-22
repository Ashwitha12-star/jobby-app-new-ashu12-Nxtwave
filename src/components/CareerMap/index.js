// components/CareerMap/index.js
import {useState, useEffect} from 'react'
import './index.css'

const defaultPaths = [
  {
    id: 1,
    title: 'Frontend Developer',
    steps: [
      'HTML & CSS',
      'JavaScript',
      'React.js',
      'Build Projects',
      'Apply for Jobs',
    ],
  },
  {
    id: 2,
    title: 'Backend Developer',
    steps: [
      'Node.js Basics',
      'Express.js',
      'MongoDB',
      'Authentication',
      'API Projects',
    ],
  },
]

const CareerMap = () => {
  const [careerPaths, setCareerPaths] = useState([])
  const [completedSteps, setCompletedSteps] = useState(() => {
    const stored = localStorage.getItem('careerMapProgress')
    return stored ? JSON.parse(stored) : {}
  })

  useEffect(() => {
    setCareerPaths(defaultPaths)
  }, [])

  const toggleStep = (pathId, stepIndex) => {
    const updated = {...completedSteps}
    if (!updated[pathId]) updated[pathId] = []

    if (updated[pathId].includes(stepIndex)) {
      updated[pathId] = updated[pathId].filter(i => i !== stepIndex)
    } else {
      updated[pathId].push(stepIndex)
    }
    setCompletedSteps(updated)
    localStorage.setItem('careerMapProgress', JSON.stringify(updated))
  }

  return (
    <div className="career-map-container">
      <h1>Career Roadmap</h1>
      {careerPaths.map(path => (
        <div key={path.id} className="career-path">
          <h2>{path.title}</h2>
          <ul>
            {path.steps.map((step, index) => {
              const uniqueKey = `${path.id}-${step}` // ✅ Unique key (string-based)
              return (
                <li
                  key={uniqueKey}
                  className={
                    completedSteps[path.id]?.includes(index)
                      ? 'step done'
                      : 'step'
                  }
                  onClick={() => toggleStep(path.id, index)}
                >
                  {completedSteps[path.id]?.includes(index) ? '✅ ' : '⬜ '}
                  {step}
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default CareerMap
