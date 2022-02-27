import { makeStyles, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useEffect } from 'react';
import { shuffle } from '../util/shuffle'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  select: {
    borderColor: theme.palette.secondary.main,

    '&:before': {
        borderColor: theme.palette.secondary.main,
    },
    '&:after': {
        borderColor: theme.palette.secondary.main,
    }
},
}));

export default function Filter({ data, filter, setFilter, setQueue }) {
  const classes = useStyles();

  const handleFilterChange = (event, override) => {
    let result = null;
    let target = event?.target?.value || override;

    // check if value is defined
    if(target) {
      setFilter(target);

      // set new queue
      switch(target) {
        case 'None':
          setQueue(data);
          break;
        case 'Popularity':
          result = data;
          result.sort((a, b) => b.popularity - a.popularity);
          setQueue(result);
          break;
        case 'Newest':
          result = data;
          result.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
          setQueue(result);
          break;
        case 'Oldest':
          result = data;
          result.sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
          setQueue(result);
          break;
        case 'High Rating':
          result = data;
          result.sort((a, b) => b.vote_average - a.vote_average);
          setQueue(result);
          break;
        case 'Low Rating':
          result = data;
          result.sort((a, b) => a.vote_average - b.vote_average);
          setQueue(result);
          break;
        case 'Shuffle':
          setQueue(shuffle(data));
        default:
          setQueue(shuffle(data));
      }
    }
  };

  useEffect(() => {
    if(filter === "") {
      handleFilterChange(null, "Newest")
    }
  }, [])

  return(
    <FormControl variant="outlined" className={classes.formControl}>
    <InputLabel id="outlined-label">Sort By</InputLabel>
      <Select
        className={classes.select}
        labelId="outlined-label"
        id="select-outlined"
        value={filter}
        onChange={e => handleFilterChange(e)}
        label="Sort By"
        //color='secondary'
      >
        {/* <MenuItem value={"None"}>No Filter</MenuItem> */}
        {/* <ListSubheader>Options:</ListSubheader> */}
        <MenuItem value={"Newest"}>Newest</MenuItem>
        <MenuItem value={"Popularity"}>Popularity</MenuItem>
        <MenuItem value={"High Rating"}>High Ratings</MenuItem>
        <MenuItem value={"Low Rating"}>Low Ratings</MenuItem>
        <MenuItem value={"Oldest"}>Oldest</MenuItem>
        <MenuItem value={"Shuffle"}>Random</MenuItem>
      </Select>
    </FormControl>
  );
}