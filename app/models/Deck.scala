package models

import play.api.db._
import play.api.Play.current

import anorm._
import anorm.SqlParser._


/**
 * Created with IntelliJ IDEA by: alejandro
 * Date: 15/05/14
 * Time: 12:37
 */
case class Deck(id:Pk[Long] = NotAssigned, name:String){

  lazy val cards:List[Card] =
    id.map { deckID =>
      Card.deckCards(deckID)
    }.getOrElse(List[Card]()).asInstanceOf[List[Card]]

}

object Deck{

  def userDecks(userId: Long) = {
    DB.withConnection{implicit connection =>
      val result: List[Deck] = SQL("""
                                   SELECT * from Deck
                                   WHERE userId = $userId
                                   """)
        .as(parseDecks *)
    }
  }

  private def parseDecks: RowParser[Deck] = {
    get[Pk[Long]]("id") ~
    get[String]("name") map {
      case id ~ name => Deck(id, name)
    }
  }

}