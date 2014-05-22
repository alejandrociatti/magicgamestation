package models

import models.CardColor.CardColor
import models.Type.Type
import anorm._
import play.api.db.DB
import play.api.Play.current
import anorm.SqlParser._
import anorm.~
import anorm.Id
import models.Rarity.Rarity

/**
 * Created with IntelliJ IDEA by: alejandro
 * Date: 14/05/14
 * Time: 19:55
 */
//Card class & constructor declaration
case class Card(
            id:Pk[Long],
            name:String,
            color:CardColor,
            CMC:String,
            cardType:Type,
            subtype:String,
            rules:String,
            text:String,
            power:String,
            toughness:String,
            magicSet:String,
            rarity:Rarity)

//The companion object holds the static methods (Things like getting cards from DB)
object Card{

  def deckCards(deckId: Long) = {
    DB.withConnection{implicit connection =>
      val result: List[Card] = SQL("""
                                   SELECT * from Deck_Card
                                   WHERE deckId = $deckId
                                   """)
        .as(parseCards *)

    }
  }

  def getCard = new Card(new Id(1), "Child of Alara", CardColor.GLD, "WURBG", Type.LEGENDARY, "Creature Avatar",
                        "When Child of Alara (...)", "The progeny of the Maelstrom (...)", "6","6", "CFX", Rarity.MYTHIC)

  private def parseCards: RowParser[Card] = {
      get[Pk[Long]]("id") ~
      get[String]("name") ~
      get[String]("color") ~
      get[String]("cmc") ~
      get[String]("cardType") ~
      get[String]("subtype") ~
      get[String]("rules") ~
      get[String]("text") ~
      get[String]("power") ~
      get[String]("toughness") ~
      get[String]("magicSet") ~
      get[String]("rarity")  map {
      case id ~ name ~ color ~ cmc ~ cardType ~ subtype ~ rules ~ text ~ power ~ toughness ~ magicSet ~ rarity =>
        Card(id, name, CardColor.withName(color), cmc, Type.withName(cardType), subtype, rules, text, power, toughness, magicSet, Rarity.withName(rarity))
    }
  }
}

//These are enums:
object CardColor extends Enumeration{
  type CardColor = Value
  val W = Value("W")
  val U = Value("U")
  val R = Value("R")
  val B = Value("B")
  val G = Value("G")
  val LND = Value("LND")
  val GLD = Value("GLD")
  val ART = Value("ART")
}

object Type extends Enumeration{
  type Type = Value
  val ARTIFACT = Value("ARTIFACT")
  val BASIC = Value("BASIC")
  val CREATURE = Value("CREATURE")
  val ENCHANTMENT = Value("ENCHANTMENT")
  val INSTANT = Value("INSTANT")
  val LAND = Value("LAND")
  val LEGENDARY = Value("LEGENDARY")
  val PLANESWALKER = Value("PLANESWALKER")
  val SORCERY = Value("SORCERY")
  val TRIBAL = Value("TRIBAL")
  val UNKNOWN = Value("UNKNOWN")
}

object Rarity extends Enumeration{
  type Rarity = Value
  val COMMON = Value("COMMON")
  val C = Value("C")
  val UNCOMMON = Value("UNCOMMON")
  val U = Value("U")
  val RARE = Value("RARE")
  val R = Value("R")
  val MYTHIC = Value("MYTHIC")
  val M = Value("M")
}
