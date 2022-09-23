import React, { useState } from "react";
import Two_Of_Clubs from "../../resources/images/PNG-cards-1.3/2_of_clubs.png";
import Two_Of_Diamonds from "../../resources/images/PNG-cards-1.3/2_of_diamonds.png";
import Two_Of_Hearts from "../../resources/images/PNG-cards-1.3/2_of_hearts.png";
import Two_Of_Spades from "../../resources/images/PNG-cards-1.3/2_of_spades.png";
import Three_Of_Clubs from "../../resources/images/PNG-cards-1.3/3_of_clubs.png";
import Three_Of_Diamonds from "../../resources/images/PNG-cards-1.3/3_of_diamonds.png";
import Three_Of_Hearts from "../../resources/images/PNG-cards-1.3/3_of_hearts.png";
import Three_Of_Spades from "../../resources/images/PNG-cards-1.3/3_of_spades.png";
import Four_Of_Clubs from "../../resources/images/PNG-cards-1.3/4_of_clubs.png";
import Four_Of_Diamonds from "../../resources/images/PNG-cards-1.3/4_of_diamonds.png";
import Four_Of_Hearts from "../../resources/images/PNG-cards-1.3/4_of_hearts.png";
import Four_Of_Spades from "../../resources/images/PNG-cards-1.3/4_of_spades.png";
import Five_Of_Clubs from "../../resources/images/PNG-cards-1.3/5_of_clubs.png";
import Five_Of_Diamonds from "../../resources/images/PNG-cards-1.3/5_of_diamonds.png";
import Five_Of_Hearts from "../../resources/images/PNG-cards-1.3/5_of_hearts.png";
import Five_Of_Spades from "../../resources/images/PNG-cards-1.3/5_of_spades.png";
import Six_Of_Clubs from "../../resources/images/PNG-cards-1.3/6_of_clubs.png";
import Six_Of_Diamonds from "../../resources/images/PNG-cards-1.3/6_of_diamonds.png";
import Six_Of_Hearts from "../../resources/images/PNG-cards-1.3/6_of_hearts.png";
import Six_Of_Spades from "../../resources/images/PNG-cards-1.3/6_of_spades.png";
import Seven_Of_Clubs from "../../resources/images/PNG-cards-1.3/7_of_clubs.png";
import Seven_Of_Diamonds from "../../resources/images/PNG-cards-1.3/7_of_diamonds.png";
import Seven_Of_Hearts from "../../resources/images/PNG-cards-1.3/7_of_hearts.png";
import Seven_Of_Spades from "../../resources/images/PNG-cards-1.3/7_of_spades.png";
import Eight_Of_Clubs from "../../resources/images/PNG-cards-1.3/8_of_clubs.png";
import Eight_Of_Diamonds from "../../resources/images/PNG-cards-1.3/8_of_diamonds.png";
import Eight_Of_Hearts from "../../resources/images/PNG-cards-1.3/8_of_hearts.png";
import Eight_Of_Spades from "../../resources/images/PNG-cards-1.3/8_of_spades.png";
import Nine_Of_Clubs from "../../resources/images/PNG-cards-1.3/9_of_clubs.png";
import Nine_Of_Diamonds from "../../resources/images/PNG-cards-1.3/9_of_diamonds.png";
import Nine_Of_Hearts from "../../resources/images/PNG-cards-1.3/9_of_hearts.png";
import Nine_Of_Spades from "../../resources/images/PNG-cards-1.3/9_of_spades.png";
import Ten_Of_Clubs from "../../resources/images/PNG-cards-1.3/10_of_clubs.png";
import Ten_Of_Diamonds from "../../resources/images/PNG-cards-1.3/10_of_diamonds.png";
import Ten_Of_Hearts from "../../resources/images/PNG-cards-1.3/10_of_hearts.png";
import Ten_Of_Spades from "../../resources/images/PNG-cards-1.3/10_of_spades.png";
import Ace_Of_Clubs from "../../resources/images/PNG-cards-1.3/ace_of_clubs.png";
import Ace_Of_Diamonds from "../../resources/images/PNG-cards-1.3/ace_of_diamonds.png";
import Ace_Of_Hearts from "../../resources/images/PNG-cards-1.3/ace_of_hearts.png";
import Ace_Of_Spades from "../../resources/images/PNG-cards-1.3/ace_of_spades.png";
import Ace_Of_Spades2 from "../../resources/images/PNG-cards-1.3/ace_of_spades2.png";
import Jack_Of_Clubs from "../../resources/images/PNG-cards-1.3/jack_of_clubs.png";
import Jack_Of_Clubs2 from "../../resources/images/PNG-cards-1.3/jack_of_clubs2.png";
import Jack_Of_Diamonds from "../../resources/images/PNG-cards-1.3/jack_of_diamonds.png";
import Jack_Of_Diamonds2 from "../../resources/images/PNG-cards-1.3/jack_of_diamonds2.png";
import Jack_Of_Hearts from "../../resources/images/PNG-cards-1.3/jack_of_hearts.png";
import Jack_Of_Hearts2 from "../../resources/images/PNG-cards-1.3/jack_of_hearts2.png";
import Jack_Of_Spades from "../../resources/images/PNG-cards-1.3/jack_of_spades.png";
import Jack_Of_Spades2 from "../../resources/images/PNG-cards-1.3/jack_of_spades2.png";
import King_Of_Clubs from "../../resources/images/PNG-cards-1.3/king_of_clubs.png";
import King_Of_Clubs2 from "../../resources/images/PNG-cards-1.3/king_of_clubs2.png";
import King_Of_Diamonds from "../../resources/images/PNG-cards-1.3/king_of_diamonds.png";
import King_Of_Diamonds2 from "../../resources/images/PNG-cards-1.3/king_of_diamonds2.png";
import King_Of_Hearts from "../../resources/images/PNG-cards-1.3/king_of_hearts.png";
import King_Of_Hearts2 from "../../resources/images/PNG-cards-1.3/king_of_hearts2.png";
import King_Of_Spades from "../../resources/images/PNG-cards-1.3/king_of_spades.png";
import King_Of_Spades2 from "../../resources/images/PNG-cards-1.3/king_of_spades2.png";
import Queen_Of_Clubs from "../../resources/images/PNG-cards-1.3/queen_of_clubs.png";
import Queen_Of_Clubs2 from "../../resources/images/PNG-cards-1.3/queen_of_clubs2.png";
import Queen_Of_Diamonds from "../../resources/images/PNG-cards-1.3/queen_of_diamonds.png";
import Queen_Of_Diamonds2 from "../../resources/images/PNG-cards-1.3/queen_of_diamonds2.png";
import Queen_Of_Hearts from "../../resources/images/PNG-cards-1.3/queen_of_hearts.png";
import Queen_Of_Hearts2 from "../../resources/images/PNG-cards-1.3/queen_of_hearts2.png";
import Queen_Of_Spades from "../../resources/images/PNG-cards-1.3/queen_of_spades.png";
import Queen_Of_Spades2 from "../../resources/images/PNG-cards-1.3/queen_of_spades2.png";
import { Card } from "@mui/material";

const cards: any = {
    "2C": Two_Of_Clubs,
    "2D": Two_Of_Diamonds,
    "2H": Two_Of_Hearts,
    "2S": Two_Of_Spades,
    "3C": Three_Of_Clubs,
    "3D": Three_Of_Diamonds,
    "3H": Three_Of_Hearts,
    "3S": Three_Of_Spades,
    "4C": Four_Of_Clubs,
    "4D": Four_Of_Diamonds,
    "4H": Four_Of_Hearts,
    "4S": Four_Of_Spades,
    "5C": Five_Of_Clubs,
    "5D": Five_Of_Diamonds,
    "5H": Five_Of_Hearts,
    "5S": Five_Of_Spades,
    "6C": Six_Of_Clubs,
    "6D": Six_Of_Diamonds,
    "6H": Six_Of_Hearts,
    "6S": Six_Of_Spades,
    "7C": Seven_Of_Clubs,
    "7D": Seven_Of_Diamonds,
    "7H": Seven_Of_Hearts,
    "7S": Seven_Of_Spades,
    "8C": Eight_Of_Clubs,
    "8D": Eight_Of_Diamonds,
    "8H": Eight_Of_Hearts,
    "8S": Eight_Of_Spades,
    "9C": Nine_Of_Clubs,
    "9D": Nine_Of_Diamonds,
    "9H": Nine_Of_Hearts,
    "9S": Nine_Of_Spades,
    "10C": Ten_Of_Clubs,
    "10D": Ten_Of_Diamonds,
    "10H": Ten_Of_Hearts,
    "10S": Ten_Of_Spades,
    "AC": Ace_Of_Clubs,
    "AD": Ace_Of_Diamonds,
    "AH": Ace_Of_Hearts,
    "AS": Ace_Of_Spades,
    "AS2": Ace_Of_Spades2,
    "JC": Jack_Of_Clubs,
    "JC2": Jack_Of_Clubs2,
    "JD": Jack_Of_Diamonds,
    "JD2": Jack_Of_Diamonds2,
    "JH": Jack_Of_Hearts,
    "JH2": Jack_Of_Hearts2,
    "JS": Jack_Of_Spades,
    "JS2": Jack_Of_Spades2,
    "KC": King_Of_Clubs,
    "KC2": King_Of_Clubs2,
    "KD": King_Of_Diamonds,
    "KD2": King_Of_Diamonds2,
    "KH": King_Of_Hearts,
    "KH2": King_Of_Hearts2,
    "KS": King_Of_Spades,
    "KS2": King_Of_Spades2,
    "QC": Queen_Of_Clubs,
    "QC2": Queen_Of_Clubs2,
    "QD": Queen_Of_Diamonds,
    "QD2": Queen_Of_Diamonds2,
    "QH": Queen_Of_Hearts,
    "QH2": Queen_Of_Hearts2,
    "QS": Queen_Of_Spades,
    "QS2": Queen_Of_Spades2,
};

interface Props {
    image: string;
    isSelected?: boolean;
}

const CardComponent = (props: Props) => {
    
    return (<>
        {
            props.isSelected ? <Card sx={{
                backgroundImage: `url(${cards[props.image]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: .5,
                width: "50px",
                height: "75px",
                "&:hover": {
                    boxShadow: 8,
                    width: "60px",
                    height: "85px"
                }
            }} /> :
    
        <Card sx={{
            backgroundImage: `url(${cards[props.image]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "50px",
            height: "75px",
            "&:hover": {
                boxShadow: 8,
                width: "60px",
                height: "85px"
            }
        }} />
    }

    </>);
};

export default CardComponent;