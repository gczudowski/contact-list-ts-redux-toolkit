export const getNameInitials = (firstNameLastName: string) => {
  const splitName = firstNameLastName.trim().split(' ');
  const firstNameInitial = splitName[0][0].toUpperCase();
  const lastNameInitial = splitName.length > 1 ? splitName[splitName.length - 1][0].toUpperCase() : '';

  return `${firstNameInitial}${lastNameInitial}`;
};
