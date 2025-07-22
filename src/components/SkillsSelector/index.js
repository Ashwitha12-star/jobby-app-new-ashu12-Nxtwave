import {useState, useEffect} from 'react'
import './index.css'

const SkillsSelector = ({onUpdate}) => {
  const [skills, setSkills] = useState(
    () => JSON.parse(localStorage.getItem('userSkills')) || [],
  )

  const [input, setInput] = useState('')

  useEffect(() => {
    localStorage.setItem('userSkills', JSON.stringify(skills))
    if (onUpdate) onUpdate(skills)
  }, [skills, onUpdate])

  const handleAdd = () => {
    if (input && !skills.includes(input.toLowerCase())) {
      setSkills([...skills, input.toLowerCase()])
      setInput('')
    }
  }

  const handleRemove = skillToRemove => {
    const updated = skills.filter(skill => skill !== skillToRemove)
    setSkills(updated)
  }

  return (
    <div className="skills-selector">
      <h3>Select Your Skills</h3>
      <div className="skills-input-container">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="e.g., React, Python"
        />
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>
      <div className="skills-list">
        {skills.map(skill => (
          <button
            type="button"
            key={skill}
            className="skill-chip"
            onClick={() => handleRemove(skill)}
          >
            {skill} ×
          </button>
        ))}
      </div>
    </div>
  )
}

export default SkillsSelector
