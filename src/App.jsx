// import './assets/libs/boxicons-2.1.1/css/boxicons.min.css'
import './scss/App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import { connect } from 'react-redux'
import {doLogin} from './actions/auth'
import PrivateRoute from './PrivateRoute'
import Login from './pages/Login'
import PageNotFound from './pages/Error/PageNotFound'
import {Course,AddCourse,CourseDetail,AddLession} from './pages/Course'
import { Customer } from './pages/Customer'
import { Wallet} from './pages/Wallet'
import { Gitf } from './pages/Gifts'
const App = ({ auth, doLogin }) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login doLogin={doLogin} auth={auth}/>}/>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<PrivateRoute auth={auth} component={<Course/>}/>} />
                    <Route path="gifts" element={<PrivateRoute auth={auth} component={<Gitf />}/>} />
                    <Route path="courses" element={<PrivateRoute auth={auth} component={<Course />}/>} />
                    <Route path="courses/:id" element={<PrivateRoute auth={auth} component={<CourseDetail />}/>} />
                    <Route path="courses/edit/:id" element={<PrivateRoute auth={auth} component={<AddCourse />}/>} />
                    <Route path="course/lession/new" element={<PrivateRoute auth={auth} component={<AddLession />}/>} />
                    <Route path="courses/add" element={<PrivateRoute auth={auth} component={<AddCourse />}/>} />
                    <Route path="customers" element={<PrivateRoute auth={auth} component={<Customer />}/>} />
                    <Route path="wallets" element={<PrivateRoute auth={auth} component={<Wallet />}/>} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { doLogin })(App);
