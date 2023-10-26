import QuestionPage from '../pages/Dashboard/QuestionPage';
import AddQuestionPage from '../pages/Dashboard/AddQuestionPage';
import Category from '../pages/Dashboard/Category/QuestionCategory';
import TrafficCategory from '../pages/Dashboard/Category/TrafficCategory';
import QuestionBank from '../pages/Dashboard/QuestionBank/QuestionBank';
import QuestionBankDetail from '../pages/Dashboard/QuestionBank/QuestionBankDetail';
import AddQuestionBank from '../pages/Dashboard/QuestionBank/AddQuestionBank';
import SampleTest from '../pages/Dashboard/SampleTest/SampleTest';
import UserPage from '../pages/Dashboard/UserPage'
import Slot from '../pages/Dashboard/Slot/Slot'
const AdminRouteData = [
    {
        title: 'QuestionPage',
        path: '/dashboard/QuestionPage',
        element: <QuestionPage />,
      },
      {
        title: 'AddQuestionPage',
        path: '/dashboard/AddQuestionPage',
        element: <AddQuestionPage />,
      },
      {
        title: 'AddCategoryPage',
        path: 'dashboard/CategoryPage',
        element: <Category />,
      },
      {
        title: 'AddTrafficCategoryPage',
        path: 'dashboard/TrafficCategoryPage',
        element: <TrafficCategory />,
      },
      {
        title: "QuestionBankPage",
        path: "dashboard/QuestionBankPage",
        element: <QuestionBank />
      },
      {
        title: "UserPage",
        path: "dashboard/UserPage",
        element: <UserPage />
      },
      {
        title: "QuestionBankDetailPage",
        path: "dashboard/QuestionBankPage/:id",
        element: <QuestionBankDetail />
      },
      {
        title: "AddQuestionBankPage",
        path: "dashboard/QuestionBankPage/add",
        element: <AddQuestionBank />
      },
      {
        title: 'Sample Test',
        path: 'dashboard/SampleTestPage',
        element: <SampleTest />
      },
      {
        title: 'SlotPage',
        path: 'dashboard/Slot',
        element: <Slot />,
      },
]

export default AdminRouteData