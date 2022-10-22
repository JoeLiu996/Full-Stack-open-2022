const Notification = ({ message }) => {
    if(message === null) {
        return null
    }
    if(message.includes("Failed")) {
        return(
            <div className="failed">
                {message}
            </div>
        )
    }
    return(
        <div className="success">
            {message}
        </div> 
    )
}

export default Notification