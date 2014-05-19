package controllers

import play.api.mvc._
import play.api.Routes
import routes.javascript


object Application extends Controller {

  def index = Action {
    Ok(views.html.landing("Your new application is ready."))
  }

  def javascriptRoutes = Action { implicit request =>
    Ok(
      Routes.javascriptRouter("jsRoutes")(

      )
    ).as("text/javascript")
  }

}