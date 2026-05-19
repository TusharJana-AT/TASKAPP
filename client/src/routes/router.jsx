import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layout/PublicLayout";
import Home from "../pages/Home";



export const router=createBrowserRouter([
    {
        element:<PublicLayout/>,
        children:[
            {
                path:'/',
                element:<Home/>
            }
        ]
    }
])