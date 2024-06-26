// import AppLayout from "@/components/templates/AppLayout";
// import SnapshotListPage from "@/pages/snapshots/SnapshotListPage";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useNavigationType,
} from 'react-router-dom'
// import AuthLayout from "./components/templates/AuthLayout";
// import SessionLayout from "./components/templates/SessionLayout";
import SignInPage from './pages/SignInPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import MobileLayout from './components/templates/MobileLayout'
import WritePage from './pages/WritePage'
import OuterLayout from './components/templates/OuterLayout'
import InnerLayout from './components/templates/InnerLayout'
import DetailPage from './pages/DetailPage'
import SessionLayout from './components/templates/SessionLayout'

// AuthLayout: Auth 관리 템플릿
// AppLayout: 실질적인 앱의 레이아웃을 담당하는 템플릿
// SessionLayout: 로그인 여부 체크 => 로그인이 안 되어 있으면 로그인 페이지로 Redirect

export default function Router() {
  const location = useLocation()

  return (
    <Routes key={location.pathname} location={location}>
      {/* <Route path='/A' element={<A />} />
          <Route path='/B' element={<B />} />
          <Route path='/C' element={<C />} /> */}
      <Route element={<SessionLayout />}>
        <Route element={<OuterLayout />}>
          <Route path='/' element={<HomePage />} />
        </Route>
        <Route element={<InnerLayout />}>
          <Route path='/signin' element={<SignInPage />} />
        </Route>
        <Route element={<InnerLayout />}>
          <Route path='/write' element={<WritePage />} />
          <Route path='/write/:parentId' element={<WritePage />} />
        </Route>
        <Route element={<InnerLayout />}>
          <Route path='/post/:id' element={<DetailPage />} />
        </Route>
        <Route>
          <Route path='/profile' element={<ProfilePage />} />
        </Route>
        {/* <Route element={<SessionLayout />}>
        <Route
          path="/snapshots/:snapshotId/edit"
          element={<SnapshotEditPage />}
        />
      </Route> */}
      </Route>
    </Routes>
  )
}

const A = () => {
  const navigate = useNavigate()

  return (
    <div className='80vw 80vh flex justify-center items-center bg-red-500'>
      A<div onClick={() => navigate('/B')}>B</div>
    </div>
  )
}
const B = () => {
  const navigate = useNavigate()

  return (
    <div className='80vw 80vh flex justify-center items-center bg-green-500'>
      B<div onClick={() => navigate('/C')}>B</div>
    </div>
  )
}
const C = () => {
  const navigate = useNavigate()

  return (
    <div className='80vw 80vh flex justify-center items-center bg-blue-500'>
      C <div onClick={() => navigate('/A')}>C</div>
    </div>
  )
}
