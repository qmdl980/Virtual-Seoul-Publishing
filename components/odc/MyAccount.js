import TitleForm from "./TitleForm";

const MyAccount = props => (

    <div>
        <TitleForm
            title="계정 정보"
        ></TitleForm>


        <button className={"create-btn"}>저장</button>
        <div style={{height: "150px"}}></div>

    </div>
)
export default MyAccount;