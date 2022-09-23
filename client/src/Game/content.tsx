import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import CardComponent from '../Components/Cards';
import { ButtonBase, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { findAllByAltText } from '@testing-library/react';

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const CardsArray = [
    {
        image: "2C",
        isSelected: false
    },
    {
        image: "2D",
        isSelected: false
    },
    {
        image: "2H",
        isSelected: false
    },
    {
        image: "2S",
        isSelected: false
    },
    {
        image: "3C",
        isSelected: false
    },
    {
        image: "3D",
        isSelected: false
    },
    {
        image: "3H",
        isSelected: false
    },
    {
        image: "3S",
        isSelected: false
    },
    {
        image: "4C",
        isSelected: false
    },
    {
        image: "4D",
        isSelected: false
    },
    {
        image: "4H",
        isSelected: false
    },
    {
        image: "4S",
        isSelected: false
    }
]

const Action: any = []


export default function TableGame() {
    const [cards, setCards] = useState(CardsArray)
    const [action, setAction] = useState(Action)
    //const [error, setError] = useState(false)

    const handleSelection = (card: string) => {
        const newCards = cards.map((c) => {
            if (c.image === card) {
                c.isSelected = !c.isSelected
            }
            return c
        })
        setCards(newCards)

        const newAction = action.map((a: any) => {
            if (a.image === card) {
                a.isSelected = !a.isSelected
            }
            return a
        })
        setAction(newAction)

    }
/*
    useEffect(() => {
        if(action.length >=  2){
            setError(true)
            console.log("You can´t play more than 1 card")
        } else if (action.length === 1 || action.length === 0){
            setError(false)
            console.log("You can play")
        }
    }, 
    [cards, action, error])*/

  return (<>
      <CssBaseline />
      <HideOnScroll >
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div">
              13 Game - Proyecto 2
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container sx={{backgroundColor: "#19B173"}}>
        <Grid container direction="row" spacing={2} sx={{margin: 12, width: 2000, height: 500}} >
            {
                CardsArray.map((card, index) => {
                    return (<>
                        <Grid item sx={{marginTop: 20}} key={index}>
                        <ButtonBase onClick={()=>{handleSelection(card.image)}}>
                        <CardComponent  image={card.image}  isSelected={card.isSelected}/>
                        </ButtonBase>
                        </Grid>
                        </>)
                })
            }
        </Grid>
      </Container>
      </>);
}