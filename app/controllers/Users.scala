package controllers

import play.api.mvc._
import play.libs.Json
import models.User

/**
 * Created with IntelliJ IDEA by: alejandro
 * Date: 19/05/14
 * Time: 11:47
 */
object Users extends Controller{

  def list = Action {implicit request =>
    val users = User.list()
    Ok(Json.toJson(users).toString)
  }

  //def create = Action {implicit request =>

  //  Ok()
  //}
}
