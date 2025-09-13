import InputLayout from "./input/main-input";

function SignIn() {
    return (
      <>
        <div className="signIn">
          <div className="input-form">
            <form>
              <InputLayout />
              <InputLayout />
              <div className="button">
                <button>signIn</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
}

export default SignIn;