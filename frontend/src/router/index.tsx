import { createBrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import App from "@/presentation/app";
import { PageA } from "@/presentation/app/example/page-a/page-a";

const router = createBrowserRouter([
  {
    path: AppRoutes.BASE.key,
    element: <App />,
    children: [
      {
        path: AppRoutes.BASE.EXAMPLE.pageA,
        element: <PageA />,
      },
    ],
  },
]);

export { router };
