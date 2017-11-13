import inquirer from 'inquirer';

import TravelMode from '../data/TravelMode';

const getSelectedTravelMode = () => {
  const choices = TravelMode.enumValues
    .map(mode => ({ key: mode.value, name: `${mode.emoji}   (${mode.value})`, value: mode.value }));
  return inquirer.prompt([
    {
      type: 'list',
      name: 'travelMode',
      message: 'Select your travel mode',
      choices,
    },
  ]);
};

module.exports = {
  getSelectedTravelMode,
};
