import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QuizPage } from "../presentation/app/quiz/page"

const router = createBrowserRouter([
  {
    path: "/",
    element: <QuizPage />,
  },
  {
    path: "/quiz",
    element: <QuizPage />,
  },
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}
