package controllers

import play.api.mvc._
import play.api.libs.json.Json
import play.api.libs.json.Json._
import models.User
import anorm.{NotAssigned, Pk}
import play.api.data.Forms._
import play.api.data.Form

/**
 * Created with IntelliJ IDEA by: alejandro
 * Date: 19/05/14
 * Time: 11:47
 */
object Users extends Controller{

  val form = Form(
    mapping(
      "id" -> ignored(NotAssigned: Pk[Long]),
      "username" -> nonEmptyText,
      "password" -> nonEmptyText,
      "name" -> nonEmptyText,
      "email" -> email,
      "isAdmin" -> ignored(false:Boolean)
    )(User.apply)(User.unapply))

  def list = Action {implicit request =>
    val users = User.list()
    Ok(Json.toJson(users))
  }

  def create = Action {implicit request =>
    form.bindFromRequest.fold(
      formWithErrors => {
        BadRequest(Json.toJson(Map("status"->"KO", "msg"->"form"))).as(JSON)
      },
      user => {
        if(User.emailUnavailable(user.email)) Ok(Json.toJson(Map("status"->"KO","msg"->"email")))
        else if(User.unameUnavailable(user.username)) Ok(Json.toJson(Map("status"->"KO","msg"->"username")))
        else{
          val newUser = User(user.id, user.username, user.password, user.name, user.email, user.isAdmin)
          val id = User.save(newUser)
          val response = Json.toJson(Map("status"->"OK","msg"->"created user","user"->id.toString))
          println("json: "+response)
          Ok(response).as(JSON)
        }
      }
    )
  }
}
