import React from 'react'

export const UserDashboard = ({userInfo}) => {
    if(!userInfo){
        return <p className="center">No user data!</p>
    }

    return (
        <div className="row">
            <div className="col s12 m12">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">User</span>
                        <p>Your personal information could be edited here</p>
                        <br />
                        <label>email: </label>
                        <span>{userInfo.email}</span>
                        <br />

                        <label>id: </label>
                        <span>{userInfo._id}</span>
                        <br />
                    </div>
                    <div className="card-action">
                        <a href="#">Save</a>
                    </div>
                </div>
            </div>
        </div>
    )
}