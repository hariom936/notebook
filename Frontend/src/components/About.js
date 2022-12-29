import React, { useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';

export const About = () => {
  const a = useContext(noteContext)
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, [])
  return (
    //{a.state.name} => because it's  state under a state
    <div>This is About {a.state.name} and he is in class{a.state.class}</div>
  )
}
