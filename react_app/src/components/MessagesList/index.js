

export default function MessagesList({messages}) {
    console.log(messages);
    return (
        <div>
            {messages.map((message) => 
                <div key={message.id}>
                    <span>{message}</span>
                </div>
            )}
        </div>
    )
}