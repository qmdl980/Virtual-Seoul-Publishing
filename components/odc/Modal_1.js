import CloseIcon from '@material-ui/icons/Close';

const Modal_1 = ({modalVisible, closeModal}) => {

    // 모달 안의 내용 리셋
    const reset = () => {
        const inputs = document.getElementsByClassName("inputs");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = null;
        }
    }

    const show = modalVisible ? (
        <div className="modal-background">
            <div className="modal-container">
                <div className="modal-header">
                    <span>참가자 등록</span>
                    <CloseIcon 
                        className="close-button"
                        onClick={closeModal}
                    />
                </div>

                <div className="modal-contents">
                    <table>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td colSpan="3">
                                    <input className="inputs" />
                                </td>
                            </tr>
                            <tr>
                                <td>ID(E-mail)</td>
                                <td colSpan="3"><input className="inputs" /></td>
                            </tr>
                            <tr>
                                <td>Organization</td>
                                <td><input className="inputs" /></td>
                                <td>Job Title</td>
                                <td><input className="inputs" /></td>
                            </tr>
                            <tr>
                                <td>Country</td>
                                <td colSpan="3"><input className="inputs" /></td>
                            </tr>    
                        </tbody>
                    </table>
                </div>
                <div className="modal-footer">
                    <button>SAVE</button>
                    <button onClick={() => { reset() }}>DELETE</button>
                </div>
            </div>
        </div>
    ) : null;

    return (
        show
    )

}

export default Modal_1;