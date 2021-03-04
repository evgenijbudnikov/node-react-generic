module.exports = function UserModel(userBody)
{
    this.name = userBody.name
    this.email = userBody.email
    this.password = userBody.password
}