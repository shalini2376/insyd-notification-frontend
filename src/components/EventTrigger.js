import React, {useState} from 'react'
import axios from 'axios'

function EventTrigger({ setCurrentTargetUser }) {
    const [sourceUserId, setSourceUserId] = useState("")
    const [targetUserId, setTargetUserId] = useState("")
    const [type, setType] = useState("follow")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:5000/events", {
                sourceUserId,
                targetUserId,
                type,
            })
            // console.log("Full Response:", res)
            console.log("Response data:", res.data)
            // alert(res.data.message);

            // Update parent so NotificationList fetches this user's notifications
            setCurrentTargetUser(targetUserId);

            setSourceUserId("");
            setTargetUserId("");
        } catch (err) {
            console.log(err)
            alert("Error creating event");
        }
    }

    return (
      <div className='event-div'>
        <h2>Trigger Event</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Source User Name" value={sourceUserId} onChange={(e) => setSourceUserId(e.target.value)} required />
            <input type="text" placeholder="Target User Name" value={targetUserId} onChange={(e) => setTargetUserId(e.target.value)} required />
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="follow">Follow</option>
                <option value="like">Like</option>
            </select>
            <button type="submit" className='btn'>Send Event</button>
        </form>
     </div>
    )
}
export default EventTrigger;