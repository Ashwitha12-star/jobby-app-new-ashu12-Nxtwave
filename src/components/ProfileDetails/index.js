import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const ProfileDetails = props => {
  const [customName, setCustomName] = useState('')
  const [customBio, setCustomBio] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [bioInput, setBioInput] = useState('')

  useEffect(() => {
    const storedName = localStorage.getItem('customUserName')
    const storedBio = localStorage.getItem('customUserBio')

    if (storedName) {
      setCustomName(storedName)
    }
    if (storedBio) {
      setCustomBio(storedBio)
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem('customUserName', nameInput)
    localStorage.setItem('customUserBio', bioInput)
    setCustomName(nameInput)
    setCustomBio(bioInput)
    setNameInput('')
    setBioInput('')
  }

  const renderProfile = () => {
    const {profileDetails} = props
    const {profileImageUrl} = profileDetails

    return (
      <div className="profile-details-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        {customName && <h1 className="profile-name">{customName}</h1>}
        {customBio && <p className="profile-bio">{customBio}</p>}

        <div className="edit-name-container">
          <input
            type="text"
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            placeholder="Enter your name"
            className="name-input"
          />
          <input
            type="text"
            value={bioInput}
            onChange={e => setBioInput(e.target.value)}
            placeholder="Enter your description"
            className="name-input"
          />
          <button type="button" onClick={handleSave} className="save-button">
            Save Changes
          </button>
        </div>
      </div>
    )
  }

  const renderProfileFailure = () => {
    const {getProfileDetails} = props
    return (
      <div className="profile-failure-container">
        <button
          className="retry-button"
          type="button"
          onClick={getProfileDetails}
        >
          Retry
        </button>
      </div>
    )
  }

  const renderProfileLoader = () => (
    <div className="loader-container-profile" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const {profileApiStatus} = props

  switch (profileApiStatus) {
    case apiStatusConstants.inProgress:
      return renderProfileLoader()
    case apiStatusConstants.success:
      return renderProfile()
    case apiStatusConstants.failure:
      return renderProfileFailure()
    default:
      return null
  }
}

export default ProfileDetails
