const MailForm = ({ inputs, onChange, _contentSave }) => {
  const { user, company, reset } = inputs;
  return (
    <div className="mail-container">
      <div className="mail-participant-form">
        <h2>DB등록 일반 참가자에게 보내는 메일</h2>
        <table className="mail-form">
          <tbody>
            <tr className="mail-title-tr">
              <td className="mail-td1">Mail Title</td>
              <td className="mail-input-td1">
                <input
                  type="text"
                  id={"user"}
                  name="title"
                  value={user?.title || ""}
                  onChange={onChange}
                />
              </td>
            </tr>

            <tr className="mail-scripts-tr">
              <td className="mail-td2">Mail Scripts</td>
              <td className="mail-input-td2">
                <textarea
                  id={"user"}
                  name="content"
                  value={user?.content || ""}
                  onChange={onChange}
                />
              </td>
            </tr>

            <tr className="mail-receiver-tr">
              <td className="mail-td1">@</td>
              <td className="mail-input-td3">
                <input></input>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        className="virtual-setting-btn"
        name="user"
        onClick={_contentSave}
      >
        SAVE
      </button>
      <div className="mail-company-form">
        <h2>전시 기업 등록시 참가사에게 보내는 메일</h2>
        <table className="mail-form">
          <tbody>
            <tr className="mail-title-tr">
              <td className="mail-td1">Mail Title</td>
              <td className="mail-input-td1">
                <input
                  type="text"
                  id={"company"}
                  name="title"
                  value={company?.title || ""}
                  onChange={onChange}
                />
              </td>
            </tr>

            <tr className="mail-scripts-tr">
              <td className="mail-td2">Mail Scripts</td>
              <td className="mail-input-td2">
                <textarea
                  id={"company"}
                  name="content"
                  value={company?.content || ""}
                  onChange={onChange}
                />
              </td>
            </tr>

            <tr className="mail-receiver-tr">
              <td className="mail-td1">@</td>
              <td className="mail-input-td3">
                <input></input>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        className="virtual-setting-btn"
        name="company"
        onClick={_contentSave}
      >
        SAVE
      </button>
      <div className="mail-password-reset-form">
        <h2>비밀번호 리셋 메일</h2>
        <table className="mail-form">
          <tbody>
            <tr className="mail-title-tr">
              <td className="mail-td1">Mail Title</td>
              <td className="mail-input-td1">
                <input
                  type="text"
                  id={"reset"}
                  name="title"
                  value={reset?.title || ""}
                  onChange={onChange}
                />
              </td>
            </tr>

            <tr className="mail-scripts-tr">
              <td className="mail-td2">Mail Scripts</td>
              <td className="mail-input-td2">
                <textarea
                  id={"reset"}
                  name="content"
                  value={reset?.content || ""}
                  onChange={onChange}
                />
              </td>
            </tr>

            <tr className="mail-receiver-tr">
              <td className="mail-td1">@</td>
              <td className="mail-input-td3">
                <input></input>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        className="virtual-setting-btn"
        name="reset"
        onClick={_contentSave}
      >
        SAVE
      </button>
    </div>
  );
};

export default MailForm;
