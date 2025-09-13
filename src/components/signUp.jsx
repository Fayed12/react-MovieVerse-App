import InputLayout from "./input/main-input";

function SignUp() {
  return (
    <>
      <div className="signIn">
        <div className="input-form">
          <form>
            <InputLayout />
            <InputLayout />
            <InputLayout />
            <div className="button">
              <button>register</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
