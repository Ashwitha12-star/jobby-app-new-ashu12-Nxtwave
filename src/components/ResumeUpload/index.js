import {useState, useEffect} from 'react'
import './index.css'

const ResumeUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('resumeFileName')
    if (stored) {
      setUploadedFile(stored)
    }
  }, [])

  const handleFileChange = event => {
    const file = event.target.files[0]
    if (file) {
      setUploadedFile(file.name)
      localStorage.setItem('resumeFileName', file.name)
      alert('Resume uploaded successfully ✅')
    }
  }

  const handleRemove = () => {
    localStorage.removeItem('resumeFileName')
    setUploadedFile(null)
  }

  return (
    <div className="resume-upload-container">
      <h3>Upload Resume</h3>
      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
      {uploadedFile && (
        <div className="resume-status">
          <p>📄 {uploadedFile}</p>
          <button onClick={handleRemove}>Remove</button>
        </div>
      )}
    </div>
  )
}

export default ResumeUpload
