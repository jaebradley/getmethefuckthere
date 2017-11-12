import inquirer from 'inquirer';

const validateLocation = location => (
  location.trim().length > 0
);

const getInputtedLocation = message => (
  inquirer.prompt([
    {
      type: 'input',
      name: 'location',
      validate: validateLocation,
      message,
    },
  ])
);

const getSelectedLocation = (message, places) => {
  const choices = places.map(place => ({
    key: place.placeId,
    name: place.address,
    value: place.address,
  }));
  return inquirer.prompt([
    {
      type: 'list',
      name: 'location',
      message,
      choices,
    },
  ]);
};

module.exports = {
  getSelectedLocation,
  getInputtedLocation,
};
