import React from 'react'

import {Switch, Route, Redirect} from "react-router-dom";
import {DashboardPage} from "./pages/DashboardPage";
import {ArticlePage} from "./pages/ArticlePage";
import {AuthPage} from "./pages/AuthPage";
import {NotFoundPage} from "./pages/NotFoundPage";
import {HomePage} from "./pages/HomePage";
import {AdminPage} from "./admin/pages/AdminPage";
import {UsersPage} from "./admin/pages/users/UsersPage";
import {RolesPage} from "./admin/pages/roles/RolesPage";
import {ArticlesManagementPage} from "./admin/pages/articles/ArticlesManagePage";

export const useRoutes = isAuthenticated => {
    if(isAuthenticated){
        return(
            <Switch>
                <Route exact path="/admin/articles" exact={true}>
                    <ArticlesManagementPage />
                </Route>
                <Route exact path="/admin/roles" exact={true}>
                    <RolesPage />
                </Route>
                <Route exact path="/admin/users" exact={true}>
                    <UsersPage />
                </Route>
                <Route exact path="/admin" exact={true}>
                    <AdminPage />
                </Route>
                <Route path="/articles/:name" excat>
                    <ArticlePage />
                </Route>
                <Route path="/dashboard" exact={true}>
                    <DashboardPage />
                </Route>
                <Route path="/auth" exact={true}>
                    <AuthPage />
                </Route>
                <Route path="/home">
                    <HomePage />
                </Route>

                <Route exact path="/" exact={true}>
                    <HomePage />
                </Route>

                <Route path="*">
                    <NotFoundPage/>
                </Route>
            </Switch>
        )
    }
    return (
        <Switch>

            <Route path="/articles/:name" >
                <ArticlePage />
            </Route>
            <Route path="/auth" exact={true}>
                <AuthPage />
            </Route>

            <Route path="/" exact={true}>
                <HomePage />
            </Route>
            <Route path="*" exact={true}>
                <NotFoundPage/>
            </Route>

        </Switch>
    )
}