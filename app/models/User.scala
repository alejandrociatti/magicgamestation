package models

import anorm._
import anorm.SqlParser._
import play.api.db.DB
import play.api.Play.current


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
                 isAdmin:Boolean){



  lazy val decks:List[Deck] =
    id.map { userID =>
      Deck.userDecks(userID)
    }.getOrElse(List[Deck]()).asInstanceOf[List[Deck]]

}

object User{

  def save(user: User){
    DB.withConnection{implicit connection =>
      SQL("""
        INSERT INTO User(username, password, name, isAdmin)
        VALUES($user.username, $user.password, $user.name, $user.isAdmin)
          """).executeUpdate
    }
  }

  def load(username:String, password:String ){
    DB.withConnection{implicit connection =>
      SQL("SELECT * FROM User WHERE usernane=$username AND password=$password").as(userParser.singleOpt)
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
      get[Boolean]("isAdmin") map {
      case id ~ password ~ name ~ surname ~ isAdmin => User(id, password, name, surname, isAdmin)
    }
  }

}
