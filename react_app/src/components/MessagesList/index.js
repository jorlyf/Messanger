import Message from "./Message";

export default function MessagesList({messages}) {
    console.log(messages);
    return (
        <>
            {messages.map((message) => 
                <Message key={message.id} data={message.text} />
            )}
        </>
    )
}