import {useState, useEffect} from 'react'
import './index.css'

const SkillSetup = () => {
  const [skills, setSkills] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('userSkills')
    if (stored) {
      setSkills(stored)
      setSaved(true)
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem('userSkills', skills.toLowerCase())
    setSaved(true)
  }

  return (
    <div className="skill-setup-container">
      <h1>🎯 Enter Your Skills</h1>
      <textarea
        rows="5"
        placeholder="e.g., JavaScript, React, Python, SQL"
        value={skills}
        onChange={e => setSkills(e.target.value)}
      />
      <button onClick={handleSave}>Save Skills</button>
      {saved && <p className="skill-saved-text">✅ Skills saved!</p>}
    </div>
  )
}

export default SkillSetup
