import { connect } from 'react-redux';
import _Login from 'components/Login';
import { operations as userOperations, selectors as userSelectors } from 'modules/user';

const { login } = userOperations;
const { isLoggingIn } = userSelectors;

const mapStateToProps = (state, ownProps) => ({
    isLoggingIn: isLoggingIn(state)
})


const mapDispatchToProps = {
    login
} 

const Login = connect(mapStateToProps, mapDispatchToProps)(_Login);
export default Login;