import Message from "./Message";

export default function MessagesList({messages}) {
    return (
        <>
            {messages.map((message) => 
                <Message key={message.id} data={message} />
            )}
        </>
    )
}