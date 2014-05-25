package models

import anorm._
import anorm.SqlParser._
import play.api.db.DB
import play.api.Play.current
import play.api.libs.json._ // JSON library
import play.api.libs.json.Writes._ // Custom validation helpers
import play.api.libs.functional.syntax._ // Combinator syntax


/**
 * Created with IntelliJ IDEA by: alejandro
 * Date: 15/05/14
 * Time: 12:29
 */
case class User(
                 id:Pk[Long] = NotAssigned,
                 username:String,
                 password:String,
                 name:String,
                 email:String,
                 isAdmin:Boolean = false){


  lazy val decks:List[Deck] =
    id.map { userID =>
      Deck.userDecks(userID)
    }.getOrElse(List[Deck]()).asInstanceOf[List[Deck]]

}

object User{

  implicit object PkFormat extends Format[Pk[Long]] {
    def reads(json: JsValue): JsResult[Pk[Long]] = JsSuccess (
      json.asOpt[Long].map(id => Id(id)).getOrElse(NotAssigned)
    )
    def writes(id: Pk[Long]): JsValue = id.map(JsNumber(_)).getOrElse(JsNull)
  }

  //implicit val userFormat = Format[User]
  implicit val userWrites = new Writes[User]{
    def writes(u:User):JsValue = {
      Json.obj(
        "id" -> u.id.get,
        "username" -> u.username,
        "name" -> u.name,
        "isAdmin" -> u.isAdmin
      )
    }
  }

  def unameUnavailable(username:String) = {
    DB.withConnection{implicit connection =>
      SQL("""
        SELECT COUNT(*) AS Count FROM User WHERE username={username};
          """).on("username"-> username).apply().head[Long]("Count")
    } > 0
  }

  def emailUnavailable(email:String) = {
    DB.withConnection{implicit connection =>
      SQL("""
        SELECT COUNT(*) AS Count FROM User WHERE email={email};
          """).on("email"->email).apply().head[Long]("Count")
    } > 0
  }

  def save(user: User) = {
    DB.withConnection{implicit connection =>
      SQL("""
        INSERT INTO User(username, password, name, email, isAdmin)
        VALUES({username}, {password}, {name}, {email}, {isAdmin});
          """).on("username"-> user.username,
                  "password"->user.password,
                  "name"->user.name,
                  "email"->user.email,
                  "isAdmin"->user.isAdmin).executeInsert(scalar[Pk[Long]] single).get
    }
  }

  def load(username:String, password:String ){
    DB.withConnection{implicit connection =>
      SQL("SELECT * FROM User WHERE usernane=$username AND password=$password;").as(userParser.singleOpt)
    }
  }

  def list():List[User] = {
    DB.withConnection{implicit connection =>
      SQL("SELECT * FROM User").as(userParser *)
    }
  }

  private val userParser: RowParser[User] = {
      get[Pk[Long]]("id") ~
      get[String]("username") ~
      get[String]("password") ~
      get[String]("name") ~
      get[String]("email") ~
      get[Boolean]("isAdmin") map {
      case id ~ username ~ password ~ name ~ email ~ isAdmin => User(id, username, password, name, email, isAdmin)
    }
  }

}
