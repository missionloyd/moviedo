import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function SwipeableTextMobileStepper({ imgs, exp }) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(getRandomInt(1));

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {imgs?.map((step, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img 
                className={exp ? classes.imgExpand : classes.imgDefault} 
                src={step?.imgPath} 
                alt={step.label} 
              />
            )  
            : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </div>
  );
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const useStyles = makeStyles((theme) => ({
  root: {
    // // maxWidth: 400,
    display: 'flex',
    // flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  imgExpand: {
    height: 420,
    display: 'block',
    // maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
    marginBottom: '1rem',
    borderRadius: '10px',
    objectFit: 'cover',
    alignSelf: 'center',
  },
  imgDefault: {
    height: 250,
    display: 'block',
    // maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
    marginBottom: '1rem',
    borderRadius: '10px',
    objectFit: 'cover',
    alignSelf: 'center',
  },
}));

export default SwipeableTextMobileStepper;