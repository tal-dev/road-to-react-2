const UserModal = ({selectedUser, onModalClose}) => {
const { username, created_at, about, karma} = selectedUser

const date = new Date(created_at);

const dateTimeFormat = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

const createdAt = dateTimeFormat.format(date)

return (
<div className="modal-container">
    <div className="user-modal">
        <table>
            <tr>
                <td>user:</td>
                <td>{`${username}`}</td>
            </tr>
            <tr>
                <td>created:</td>
                <td>{`${createdAt}`}</td>
            </tr>
            <tr>
                <td>karma:</td>
                <td>{`${karma}`}</td>
            </tr>
            <tr>
                <td>about:</td>
                <td>{`${about}`}</td>
            </tr>
        </table>
        <div className="close" onClick={onModalClose}></div>
    </div>
</div>
)
}

export default UserModal