package controllers

import play.api.mvc._
import play.api.Routes


object Application extends Controller {

  def index = Action {
    Ok(views.html.landing("Your new application is ready."))
  }

  def javascriptRoutes = Action { implicit request =>
    Ok(
      Routes.javascriptRouter("jsRoutes")(
        routes.javascript.Users.create
      )
    ).as("text/javascript")
  }

}