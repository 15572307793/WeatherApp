/*
 * @Autor: Jiang
 * @Date: 2021-08-22 16:14:42
 * @LastAutor: you name
 * @LastEditTime: 2021-08-23 10:39:19
 * @FilePath: /Weather_WebApp/src/router/router.js
 */
import StartPage from "@pages/startPage";
import WeatherPage from "@pages/weatherPage";
export const store_routes = [
  ///学生端路由
];
const getRouter = () => {
  const router = [
    // {
    //   path: "/",
    //   name: "homePage",
    //   component: StartPage,
    // },
    {
      path: "/startPage",
      name: "startPage",
      component: StartPage,
    },
    {
      path: "/weatherPage",
      name: "weatherPage",
      component: WeatherPage,
    },
    {
      path: "/",
      redirect: "/startPage",
    },
  ];
  return router;
};

export default getRouter;
