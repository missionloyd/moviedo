import Image from 'next/image';
import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import LoadingSpinner from './LoadingSpinner';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function SwipeableTextMobileStepper({ imgs, exp }) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(getRandomInt(1));
  const [loading, setLoading] = useState(true);

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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <LoadingSpinner show={loading} />
            </div>
            {Math.abs(activeStep - index) <= 2 ? (
              exp ? (
                <Image
                  className={classes.imgDefault} 
                  alt={step.title}
                  src={step?.imgPath} 
                  alt={step.label} 
                  onLoad={() => setLoading(false)}
                  width="600px" 
                  height="500px"
                />
              ) : 
                <Image
                  className={classes.imgDefault}
                  alt={step.title} 
                  src={step?.imgPath} 
                  alt={step.label} 
                  onLoad={() => setLoading(false)}
                  width="300px" 
                  height="400px"
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
  imgDefault: {
    height: 'auto',
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