function editAction(actionIndex, actionsList, newActionData) {
  actionsList[actionIndex] = newActionData;
  console.log('editAction');
}

export default editAction;
